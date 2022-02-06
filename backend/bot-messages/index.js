const { Configuration, OpenAIApi } = require("openai");
let prompts = require("./positivePrompts.json");
require('dotenv').config()
const axios = require('axios');
const WebSocket = require('ws');
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const phrases = {
	"intro": "Generate a tweet from the perspective of someone with these characteristics:",
	"replyMessagesIntro": "Reply to these tweets with the perspective of someone with these characteristics:",
	"end": "Tweet:",
	"endReply": "Tweet Reply:"
};

/**
 * This generates a diss based off of the input it gets
 * 
 * @param {Object<text, intensity>} characteristics 
 * @param {Array[Object<username, text>]} replies 
 * @returns {Promise<String>} The reply!
 */
const generateDiss = async (characteristics, replies = null, prevDisses = null) => {
	let repliesString = "";
	// TODO: include previous disses (up to 5) in the request so the AI doesn't repeat it's self
	if (replies) {
		if (replies.length > 5) {
			replies = replies.slice(0, 5);
		}
		repliesString = replies.map(x => `${x.username}: ${x.text}`).join("\n");
		// for whether or not the diss is being randomly generated or is replying to a tweet
	}
	let promptSent = `${replies ? phrases.replyMessagesIntro : phrases.intro}\n${characteristics.text}\n${replies ? '\n' + repliesString + '\n' : ''}${replies ? phrases.endReply : phrases.end}`;

	const response = await openai.createCompletion("text-davinci-001", {
		prompt: promptSent,
		temperature: 0.98,
		max_tokens: 255,
		top_p: 0.7,
		frequency_penalty: 0.54,
		presence_penalty: 0.63,
	}).then(res => res.data);
	console.log(`prompt: ${promptSent}`);
	//console.log(response.choices[0].text);
	return response.choices[0].text.replace('\"', '').replace('\n', '');
};
const getPreviousDisses = async (userID) => {
	// TODO: this
};
/**
 * registers a user (bot)
 * @param {Object<text, username>} characteristics 
 * @returns 
 */
const registerUser = async (characteristics) => {
	let response = await axios.post(process.env.DOMAIN + 'auth/register', {
		username: characteristics.username,
		email: characteristics.username.replace(" ", "") + "@gmail.com"
	}).catch(err => console.error(err));

	return response;
};

/**
 * Loggs someone in (gets their bearer token)
 * 
 * @param {Object<text, username>} characteristics 
 * @returns {Object}
 */
const loginUser = async (characteristics) => {
	let response = await axios.post(process.env.DOMAIN + 'auth/login', {
		username: characteristics.username
	}).catch(err => console.error(err));

	return response;
};

/**
 * sends a diss and returns the obj
 * @param {String} diss 
 * @param {String} bearer 
 * @returns {Object<id, diss, userId>}
 */
const sendDiss = async (diss, bearer, replyID) => {
	const body = {
		"diss": diss,
	};
	if (replyID) {
		body["originalDiss"] = replyID;
	}
	let response = await axios.post(process.env.DOMAIN + 'diss/create', body, {
		headers: {
			'Authorization': 'Bearer ' + bearer,
		}
	}).catch(err => console.error(err));
	return response;
};

const massLogin = async (p, max) => {
	for (x of p.slice(0, max)) {
		let res = await loginUser(x);
		x.bearer = res.data.token;
		console.log(x.bearer);
	}
}
const massDiss = async (p, max) => {
	for (x of p.slice(0, max)) {
		let diss = await generateDiss(p[0]);
		//let diss = "test";
		console.log(diss);
		sendDiss(diss, x.bearer);
	}
}
const sendRandomDiss = async (max) => {
	let bot = prompts[Math.floor(Math.random() * max)];
	let diss = await generateDiss(bot);
	sendDiss(diss, bot.bearer);
};
const monitorWebsocket = async () => {
	const ws = new WebSocket('ws://localhost:5005/');

	ws.on('open', function open() {
		massLogin(prompts, 10);
		for (let i = 0; i < 10; i++) {
			sendRandomDiss(5);
		}
	});

	ws.on('message', async (data) => {
		/*{

			"newDiss":{

					"id":"91d28b73-db0e-4ffd-8891-3d723fd43a3a",

					"diss":"Testing njh#1",

					"timestamp":"2022-02-06T10:31:12.164Z",

					"userId":"457f4429-2404-42c0-83ad-7f98f28d5295",

					"originalDiss":null,

					"user":{

						"id":"457f4429-2404-42c0-83ad-7f98f28d5295",

						"email":"PunkAsFxck@gmail.com",

						"username":"PunkAsFxck"

					},

					"dissesLikes":[

						

					]

			}

		}*/
		try{
			data = JSON.parse(data);
		} catch(err){
			console.log("json invalid in ws");
		}
		
		console.log('received: %s', data.newDiss);
		if ('newDiss' in data) {
			//console.log('NEW DISS IN DATA!');
			let bot = prompts[Math.floor(Math.random() * 10)];
			let diss = '';
			if (data.originalDiss != null) {
				diss = await generateDiss(bot, [{text: data.newDiss.originalDiss.diss, username: data.newDiss.originalDiss.user.username}, {text: data.newDiss.diss, username: data.newDiss.user.username}]);
			} else {
				diss = await generateDiss(bot, [{text: data.newDiss.diss, username: data.newDiss.user.username}]);
			}
			console.log('diss: %s', diss);
			if(diss != "" && diss != data.newDiss.diss){
				await sendDiss(diss, bot.bearer, data.newDiss.id);
			}
		}

	});
};

massLogin(prompts, 5);
monitorWebsocket();
//generateDiss(prompts[0]);
//generateDiss(prompts[0], [{ "username": "doghater69", "text": "I Hate dogs!" }]);
