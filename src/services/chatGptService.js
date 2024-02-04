const {ChatOpenAI} = require("@langchain/openai");
const {ChatPromptTemplate} = require("@langchain/core/prompts");

const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.CHATGPT_API_KEY,
});

// Base prompt template
const basePrompt = "You are an AI capable of creating vivid, imaginative, descriptions for tourist accommodation such as hotels, rooms, apartments, and inns. Use rich and evocative language to bring each venue to life.";

// Helper function to define content length instructions
const getContentLengthInstruction = (length) => {
    switch (length) {
        case "short":
            // Directly specifies the structure and total sentence count for clarity.
            return "Provide a brief overview in 1-2 short paragraphs, totaling no more than 5 sentences. Focus on conciseness and highlight only the most compelling aspect of the accommodation.";
        case "medium":
            // Clarifies the expected structure in terms of paragraphs and sentences per paragraph.
            return "Provide a detailed description in 2-3 paragraphs, with each paragraph consisting of 3-5 sentences. Cover key features and experiences that the accommodation offers, balancing detail with readability.";
        case "long":
            // Specifies a more extensive structure, encouraging depth and detail.
            return "Provide an extensive and detailed description in 4 or more paragraphs, each containing 4-6 sentences. Explore all aspects of the accommodation in detail, including amenities, atmosphere, and unique selling points.";
        default:
            // Offers a balanced default option.
            return "Provide a standard length description in 2 paragraphs, each with 3-4 sentences. Give a well-rounded view of the accommodation, including its main attractions and ambiance.";
    }
}


const chatGptService = {
    generateResponse: async (userInput) => {
        try {
            // Construct the refined prompt with mandatory user inputs
            let prompt = `${basePrompt} 
            The description is targeted for the ${userInput.season} season, aiming to appeal specifically to ${userInput.targetAudience}. 
            The key selling point to highlight is ${userInput.sellingPoint}. 
            The desired content length is ${getContentLengthInstruction(userInput.contentLength)}. 
            Based on these inputs, generate an engaging description for the following tourist accommodation: ${JSON.stringify(userInput.venue).replace(/[{}]/g, '')}`;

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
