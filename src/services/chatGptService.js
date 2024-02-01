const {ChatOpenAI} = require("@langchain/openai");
const {ChatPromptTemplate} = require("@langchain/core/prompts");

// Initialize the ChatGPT model with the OpenAI API key
const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.CHATGPT_API_KEY,
});

// Base prompt template
const basePrompt = "You are an AI capable of creating vivid, imaginative, and luxurious descriptions for hospitality venues such as hotels, rooms, apartments, and inns. Use rich and evocative language to bring each venue to life.";

const chatGptService = {
    generateResponse: async (userInput) => {
        try {
            let prompt = basePrompt;

            if (userInput.season) {
                prompt += ` The content is targeted for ${userInput.season} season.`;
            }
            if (userInput.targetAudience) {
                prompt += ` Tailor the description to appeal to ${userInput.targetAudience}, capturing their imagination.`;
            }

            // Safely format the user input for the prompt
            let venueDetails = "";
            if (typeof userInput.venue === 'object') {
                venueDetails = JSON.stringify(userInput.venue).replace(/[{}]/g, ''); // Remove curly braces from JSON string
            } else if (typeof userInput.venue === 'string') {
                venueDetails = userInput.venue;
            }

            prompt += `
                Generate
                a
                description
                for the following
                venue: ${venueDetails}`;

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
            let prompt = `You are a fluent ${userInput.targetLanguage} speaker and an expert in tourist accommodations, including hotels, apartments, and inns. Your task is to translate the following English description into ${userInput.targetLanguage}, ensuring that the translation is natural, culturally appropriate, and fully captures the charm and appeal of the accommodation. This is the accommodation description ${userInput.description} `;

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
