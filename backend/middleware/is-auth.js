const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
    const header = req.get("Authorization");
    if (!header) {
        console.log("there's no header");
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
    req.role = decodeToken.role
    next()
}

exports.checkRole = (role) => {
    return (req, res, next) => {
        const userRole = req.role;
        console.log(userRole);
        if (userRole !== role) {
            console.log("not allowed");
            res.status(403).send("This action is not allowed");
        }
        next();
    }
}