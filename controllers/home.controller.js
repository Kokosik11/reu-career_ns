const User = require('../models/User.model');

module.exports.main = (req, res) => {
    res.send("Main")
}

module.exports.me = (req, res, next) => {
    return res.send(req.user);
}