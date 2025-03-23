const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});

const generationConfig = {
  temperature: 0.1,
  topP: 1,
  topK: 40,
  maxOutputTokens: 512,
  responseMimeType: "text/plain",
};


  export const chatSession = model.startChat({
    generationConfig,
  
    // history: [
    // ],
  });

  export const sendMessage = async (message) => {
    const result = await chatSession.sendMessage(message);
    return result.response.text();
  };

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());


  