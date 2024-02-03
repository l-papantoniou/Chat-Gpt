const {ChatOpenAI} = require("@langchain/openai");
const {ChatPromptTemplate} = require("@langchain/core/prompts");

// Initialize the ChatGPT model with the OpenAI API key
const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.CHATGPT_API_KEY,
});

// Base prompt template
const basePrompt = "You are an AI capable of creating vivid, imaginative, descriptions for tourist accommodation such as hotels, rooms, apartments, and inns. Use rich and evocative language to bring each venue to life.";

// Helper function to define content length instructions
const getContentLengthInstruction = (length) => {
    switch (length) {
        case "short":
            return "Provide a brief overview, up to five sentences";
        case "medium":
            return "Provide a detailed paragraph with up to ten sentences";
        case "long":
            return "Provide an extensive description with multiple paragraphs, covering all aspects in detail";
        default:
            return "Provide a standard length description, about three sentences.";
    }
}


const chatGptService = {
    generateResponse: async (userInput) => {
        try {

            // Construct the refined prompt with mandatory user inputs
            let prompt = `${basePrompt} 
            The description is targeted for the ${userInput.season} season, aiming to appeal specifically to ${userInput.targetAudience}. 
            The key selling point to highlight is ${userInput.sellingPoint}. 
            The desired content length is ${getContentLengthInstruction(userInput.contentLength)}, indicating the level of detail and depth required. 
            Based on these inputs, generate a detailed and engaging description for the venue: ${JSON.stringify(userInput.venue).replace(/[{}]/g, '')}`;


            console.log(prompt);

            // Create the prompt template dynamically
            const dynamicPromptTemplate = ChatPromptTemplate.fromMessages([
                ["system", prompt],
                ["user", ""] // User input part is empty as details are included in the system prompt
            ]);

            // Chain the prompt template with the ChatOpenAI model
            const dynamicChatPipeline = dynamicPromptTemplate.pipe(chatModel);

            // Invoke the chat pipeline
            const response = await dynamicChatPipeline.invoke({input: ""});
            return response.content;
        } catch (error) {
            console.error('Error in getting response:', error);
            return null;
        }
    },

    translateContent: async (userInput) => {
        try {
            // Construct the prompt for translation
            let prompt = `You are a fluent ${userInput.targetLanguage} speaker and an expert in tourist accommodations, including hotels, apartments, and inns. Your task is to adapt the following English description into ${userInput.targetLanguage}, making sure that the translation is natural, culturally appropriate, and retains the charm and appeal of the accommodation.
             Original Description: "${userInput.description}" Please provide the adapted text `;

            const dynamicPromptTemplate = ChatPromptTemplate.fromMessages([
                ["system", prompt],
                ["user", ""]
            ]);

            // Chain the prompt template with the ChatOpenAI model
            const dynamicChatPipeline = dynamicPromptTemplate.pipe(chatModel);

            const response = await dynamicChatPipeline.invoke({input: ""});

            // Return the translated text
            return response.content;
        } catch (error) {
            console.error('Error in translating to Greek:', error);
            return "Translation error occurred.";
        }
    }

};

// Export the chatGptService for use in other parts of the application
module.exports = chatGptService;
