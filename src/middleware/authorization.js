const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    const jwtToken = req.body.headers.token;

    if (!jwtToken) {
        return res.status(403).json({ msg: "authorization denied" });
    }

    try {
        //it is going to give us the user id (user:{id: user.id})
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

        req.user = payload.user;

        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: "Token is not valid" });
    }
};