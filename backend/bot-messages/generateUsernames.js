const { Configuration, OpenAIApi } = require("openai");
const prompts = require("./prompts.json");
let positivePrompts = require("./positivePrompts.json");
const fs = require("fs");
require('dotenv').config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const generateUsername = async (prompt, promptTextInitial) => {
	const response = await openai.createCompletion("text-davinci-001", {
		prompt: promptTextInitial+prompt.text+"\nUsername:",
		temperature: 0.95,
		max_tokens: 30,
		top_p: 1,
		frequency_penalty: 0.54,
		presence_penalty: 0.03,
	}).then(res => res.data);
	let responseString = response.choices[0].text.replace(/(\r\n|\n|\r)/gm, "");
	prompt.username = responseString;
	return prompt;
};

const modifyPromptsUsername = async (promptTextInitial) => {
	let newPrompts = [];
	for(let prompt of prompts){
		let addedUsername = await generateUsername(prompt, promptTextInitial);
		console.log(addedUsername.username);
		newPrompts.push(addedUsername);
	}
	return newPrompts;
};

const getPositivePromptTextInitial = async () => {

	const response = await openai.createCompletion("text-davinci-001", {
		prompt: "## This is the prompt for the AI to generate the different characteristics for the bots!\n\nCreate a sentence describing different people's personalities. They should be ranging from happy mums to edgy teenagers.\n\nExamples: \n\nThis person is a happy dad who has just brought a house and started a family with his newly wedded wife. He works in finance for a big conglomerate.\n\nThis person is a man with a passion for the programming language C, he is currently a university student and likes to talk about servers.\n\nThis person is a 15 year old boy who has just discovered how to post on Instagram, he likes to make jokes online which sometimes offend people.\n\n------------\n\nThis person is a bubbly stay-at-home mom who loves spending time with her kids. She's always up for a good conversation and is always smiling.\n",
		temperature: 0.93,
		max_tokens: 361,
		top_p: 1,
		frequency_penalty: 0.45,
		presence_penalty: 0.39,
	}).then(res => res.data);
	let responseArr = response.choices[0].text.split("\n").filter(x => x != "");

	return responseArr;
};

const addAggressiveUsernames = async () => {
	const unkindPromptText = "Generate usernames based off of the characteristics of a person.\n\nText: This person is a rampant trump supporter who is campaigning for their state to contribute to build the wall to \\\"keep their country pure\\\".\nUsername: MAGAFORLIFE\n\nText:This person is a diehard liberal who believes that the government should do more to help the less fortunate, they are often vocal about their beliefs and support for socialist policies. \nUsername: fuckBillionaires69\n\nText:";
	let newPrompts = await modifyPrompts(unkindPromptText);
	console.log(JSON.stringify(newPrompts));
	fs.writeFile('./prompts.json', JSON.stringify(newPrompts), (err) => {
		if(err) throw err;
	});
};

const getPositivePrompts = async () => {
	let positivePrompts = [];
	while(positivePrompts.length < 50){
		let prompts = await getPositivePromptTextInitial();
		console.log(JSON.stringify(prompts));
		prompts = prompts.map(x => {
			return {"text": x}
		});
		positivePrompts.push(...prompts);
	}
	const positiveUsernamePrompt = "Generate usernames based off of the characteristics of a person.\n\nText: his person is a grungy teenager who dresses in all black and listens to metal music. He's always rebelling against anything and everything his parents say.\n\nUsername: fxckS1ciety2\n\nText: This person is a careeroriented woman who is always striving to be the best. She's got a sharp tongue and can be quite critical at times.\n\nUsername: KarenOnTheInternet\n\nText:";
	for(x of positivePrompts){
		x = await generateUsername(x, positiveUsernamePrompt);
		x = x.trim();
		console.log(x.username)
	}
	console.log(JSON.stringify(positivePrompts));
	fs.writeFile('./positivePrompts.json', JSON.stringify(positivePrompts), (err) => {
		if(err) throw err;
	});
};

getPositivePrompts();