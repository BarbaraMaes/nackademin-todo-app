const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.get("Authorization");
    if (!header) {
        //throw error
    }
    const token = header.split(" ")[1];
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, process.env.SECRET);
    } catch (error) {
        //throw error
    }
    if (!decodeToken) {
        //not authenticated
    }
    req.userId = decodeToken.userId;
    next()
}