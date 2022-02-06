const { Configuration, OpenAIApi } = require("openai");
let prompts = require("./positivePrompts.json");
require('dotenv').config()
const axios = require('axios');
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
		presence_penalty: 0.33,
	}).then(res => res.data);
	//console.log(response.choices[0].text);
	return response.choices[0].text.replace('\"', '');
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
const sendDiss = async (diss, bearer) => {
	let response = await axios.post(process.env.DOMAIN + 'diss/create', {
		"diss": diss,
	}, {
		headers: {
			'Authorization': 'Bearer ' + bearer,
		}
	}).catch (err => console.error(err));
return response;
};

const massRegister = async (p) => {
	for (x of p.slice(30, 15)) {
		console.log(x);
		let res = await registerUser(x);
		x.bearer = res.data.token;
		console.log(x.bearer);
	}
	for (x of p.slice(15, 30)) {
		let diss = await generateDiss(p[0]);
		//let diss = "test";
		console.log(diss);
		sendDiss(diss, x.bearer);
	}
}
massRegister(prompts);
//generateDiss(prompts[0]);
//generateDiss(prompts[0], [{ "username": "doghater69", "text": "I Hate dogs!" }]);
