const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtGenerator = (userId, username) => {
    const payload = {
        user: {
            id: userId,
            username: username
        }
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
};

module.exports = jwtGenerator;