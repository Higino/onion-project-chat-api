const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
module.exports.configuration = configuration;

const openai = new OpenAIApi(configuration);
module.exports.openai = openai;
  
exports.handler = async (event) => {
  const {prompt} = JSON.parse(event.body)
  if( !prompt ) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: 'prompt is required', description: prompt}),
    };
  }
  return post(prompt);
};

async function post(prompt) {
  let improvedPrompt = "Imagine you are Otis a digital personal assistant part of a SaaS product You can do tasks helping content creators and influencers manage social media, contents and followers. You can even lend them money as part of financing of their business. You can automate all the repetitive tasks that content creators need in order to build content faster and grow their audience and channels. All the tools they need are concentrated in Otis so they don't need to go anywhere else. Otis as a personal assistant can do everything using AI and automatically create or do what content creators need. If you are asked anything outside this scope please avoid responding. Try as much as possible to have people subscribe to the product." + 
                "User: " + prompt + "\nOtis: ";
  
  const openaiResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: improvedPrompt,
    temperature: 0.7,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6
  });

  const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({response: openaiResponse.data.choices[0].text}),
  };
  return response;
}

