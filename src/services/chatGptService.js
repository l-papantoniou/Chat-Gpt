// Importing necessary classes from the LangChain packages
const {ChatOpenAI} = require("@langchain/openai");
const {ChatPromptTemplate} = require("@langchain/core/prompts");


// Initialize the ChatGPT model with the OpenAI API key
const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.CHATGPT_API_KEY,
});

// Create a prompt template with predefined system context and a placeholder for user input
const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "You are a world class technical documentation writer."], // Context setup for the AI
    ["user", "{input}"], // Placeholder for user input
]);

// Chain the prompt template with the ChatOpenAI model for input processing
const chatPipeline = promptTemplate.pipe(chatModel);

const chatGptService = {
    // Async function to generate a response from the ChatGPT model
    async generateResponse(userInput) {
        try {
            // Invoke the chat pipeline with the user's input and get the response
            const response = await chatPipeline.invoke({
                input: userInput,
            });

            console.log(response);
            return response.content;
        } catch (error) {
            // Log and handle errors (e.g., network issues, invalid API key)
            console.error('Error in getting response:', error);
            return null;
        }
    }
};

// Export the chatGptService for use in other parts of the application
module.exports = chatGptService;