const User = require('../models/User.model');
const passport = require("passport");


module.exports.signup = (req, res, next) => {
    if(!req.body.email) {
        return res.status(431).json({ "err": "email is required" });
    } 
    if (!req.body.password) {
        return res.status(431).json({ "err": "password is required" });
    } 

    User.findOne({ email: req.body.email })
        .then((userDB) => {
            if(userDB) return res.status(431).json({ "err": "This email address already exists"});

            const user = new User({ email: req.body.email, username: req.body.username});
            user.setPassword(req.body.password)
            user.save((err, user) => {
                if(err) console.error(err);
            });

            return res.status(200).json({ "message": "User signup successfully"})
        })
}

module.exports.loginGET = (req, res) => {
    res.send("login");
}

module.exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if(err) return next(err);
        if(!user) return res.status(432).json({ "err": "Incorrect email or password" });

        req.logIn(user, err => {
            if(err) return next(err);
            res.redirect('/me');
        });
    })(req, res, next);
}