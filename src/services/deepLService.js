const axios = require('axios');
require('dotenv').config();

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

const translateText = async (text, targetLang) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api-free.deepl.com/v2/translate',
            params: {
                auth_key: process.env.DEEPL_API_KEY,
                text: text,
                target_lang: targetLang
            }
        });
        return response.data.translations[0].text;
    } catch (error) {
        console.error('DeepL Translation Error:', error);
        throw new Error('Failed to translate text with DeepL.');
    }
};

module.exports = {translateText};
