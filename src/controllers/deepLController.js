const {translateText} = require('../services/deeplService');

const translate = async (req, res) => {
    try {
        const {text, targetLang} = req.body;
        const response = await translateText(text, targetLang);
        res.json({response});

    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {translate};
