const {ChatOpenAI} = require("@langchain/openai");
const {ChatPromptTemplate} = require("@langchain/core/prompts");

// Initialize the ChatGPT model with the OpenAI API key
const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.CHATGPT_API_KEY,
});

// Base prompt template
const basePrompt = "You are an AI specialized in creating engaging and attractive descriptions for hospitality venues such as hotels, rooms, apartments, and inns.";

const chatGptService = {
    generateResponse: async (userInput) => {
        try {
            let prompt = basePrompt;

            if (userInput.season) {
                prompt += ` The content is targeted for ${userInput.season} season.`;
            }
            if (userInput.targetAudience) {
                prompt += ` The content is targeted towards ${userInput.targetAudience}.`;
            }

            // Safely format the user input for the prompt
            let venueDetails = "";
            if (typeof userInput.venue === 'object') {
                venueDetails = JSON.stringify(userInput.venue).replace(/[{}]/g, ''); // Remove curly braces from JSON string
            } else if (typeof userInput.venue === 'string') {
                venueDetails = userInput.venue;
            }

            prompt += ` Generate a description for the following venue: ${venueDetails}`;

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
    }
};

// Export the chatGptService for use in other parts of the application
module.exports = chatGptService;
