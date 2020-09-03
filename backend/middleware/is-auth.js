const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
    const header = req.get("Authorization");
    if (!header) {
        const error = new Error("Not authenticated.");
        error.statusCode = 401;
        throw error;
    }
    const token = header.split(" ")[1];
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, process.env.SECRET);
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    if (!decodeToken) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodeToken.userId;
    req.role = decodeToken.role
    next()
}

exports.checkRole = (role) => {
    return (req, res, next) => {
        const userRole = req.role;
        console.log(userRole);
        if (userRole !== role) {
            const error = new Error("This action is not permitted");
            error.statusCode = 401;
            throw error;
        }
        next();
    }
}