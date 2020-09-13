const { AuthDB } = require("../database/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const todoModel = require("./CRUD-Todo");
require('dotenv').config()

exports.clear = async () => {
    const clear = await AuthDB.remove({}, { multi: true });
    return clear;
}

exports.signup = async (email, password) => {
    //hash password
    const exists = await AuthDB.findOne({ email: email });
    //check if user already exists.
    if (exists) {
        return null;
    }
    try {
        const hash = await bcrypt.hash(password, 12);
        const user = await AuthDB.insert({ email, hash, role: "USER" });
        return user;
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (email, password) => {
    try {
        const user = await AuthDB.findOne({ email: email });
        if (!user) {
            //send statuscodes nd shit
            return null;
        }
        const passwordCompare = await bcrypt.compare(password, user.hash);
        if (!passwordCompare) {
            console.log("passwords don't match")
            return
        }
        const token = await jwt.sign({
            email: user.email,
            userId: user._id.toString(),
            role: user.role
        }, process.env.SECRET, { expiresIn: "1h" });
        return ({ token: token, userId: user._id.toString(), user: user });
    } catch (error) {
        //throw error
    }
}

exports.deleteUser = async (email, password) => {
    try {
        const user = await AuthDB.findOne({ email: email });
        const passwordCompare = await bcrypt.compare(password, user.hash);
        if (!passwordCompare) {
            console.log("passwords don't match")
            return
        }
        await todoModel.clearUser(user._id);
        await AuthDB.remove({ _id: user._id });
        return user;
    }
    catch (err) {
        console.log(err);
    }
}