//const { AuthDB } = require("../database/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const todoModel = require("./CRUD-Todo");
const mongoose = require("mongoose");
require('dotenv').config();

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    role: String
})

const User = mongoose.model("User", userSchema);


exports.clear = async () => {
    return await User.deleteMany({});
}


exports.signup = async (email, password, role) => {
    const exists = await User.findOne({ email: email });
    if (exists) {
        return null;
    }
    try {
        if (role) {
            role = "ADMIN"
        }
        else {
            role = "USER"
        }
        const hash = await bcrypt.hash(password, 12);
        const fields = new User({
            email: email,
            password: hash,
            role: role
        })
        const user = await User.create(fields);
        return user;
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return null
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            console.log("passwords don't match");
            return;
        }
        const token = await jwt.sign({
            email: user.email,
            userId: user._id.toString(),
            role: user.role
        }, process.env.SECRET, { expiresIn: "1h" });
        return ({ token: token, userId: user._id.toString(), user: user });
    } catch (error) {
        console.log(error);
    }
}


exports.deleteUser = async (email, password) => {
    try {
        const user = await User.findOne({ email: email.toString() });
        if (!user) {
            console.log("user not found");
            return
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            console.log("passwords don't match")
            return
        }
        await todoModel.clearUser(user._id);
        return await User.deleteOne({ _id: user._id });
    } catch (error) {
        console.log(error);
    }
}