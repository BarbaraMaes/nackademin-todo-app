const actions = require('../models/Auth');

exports.signup = async (req, res) => {
    console.log(req.body);
    const user = await actions.signup(req.body.email, req.body.password, req.body.admin);
    if (!user) {
        res.status(500).json({ message: "user already exists" });
    }
    res.status(200).json(user);
}

exports.login = async (req, res) => {
    console.log(req.body);
    const auth = await actions.login(req.body.email, req.body.password);
    if (!auth) {
        res.status(500).json({ message: "can't find user" });
    }
    else res.status(200).json(auth);
}

exports.clearUser = async (req, res) => {
    const clear = await actions.deleteUser(req.body.email, req.body.password);
    if (!clear) {
        res.status(500).json({ message: "something went wrong" });
    }
    res.status(200).json(clear);
}