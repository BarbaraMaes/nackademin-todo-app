const { AuthDB } = require("../database/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (email, password) => {
    //hash password
    try {
        const hash = await bcrypt.hash(password, 12);
        const user = AuthDB.insert({ email, hash });
        return user;
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (email, password) => {
    try {
        const user = await AuthDB.findOne({ email: email });
        if (!user) {
            console.log("can't find user")
            return
        }
        const passwordCompare = await bcrypt.compare(password, user.hash);
        if (!passwordCompare) {
            console.log("passwords don't match")
            return
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, process.env.SECRET, { expiresIn: "1h" });
        return ({ token: token, userId: user._id.toString(), user: user });
    } catch (error) {
        //throw error
    }
}