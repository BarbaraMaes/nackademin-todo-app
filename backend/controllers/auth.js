const actions = require('../models/Auth');

exports.signup = async (req, res) => {
    const user = await actions.signup(req.body.email, req.body.password);
    res.status(200).json(user);
}

exports.login = async (req, res) => {
    const auth = await actions.login(req.body.email, req.body.password);
    res.status(200).json(auth);
}