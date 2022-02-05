const { Configuration, OpenAIApi } = require("openai");
const prompts = require("./prompts.json");
require('dotenv').config()

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
const generateDiss = async (characteristics, replies = null) => {
	let repliesString = "";
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
		temperature: 0.95,
		max_tokens: 255,
		top_p: 1,
		frequency_penalty: 0.54,
		presence_penalty: 0.03,
	}).then(res => res.data);
	console.log(response.choices[0].text);
	return response;
}



//generateDiss(prompts[0]);
generateDiss(prompts[0], [{ "username": "bidenlover69", "text": "I love what biden is doing" }]);
