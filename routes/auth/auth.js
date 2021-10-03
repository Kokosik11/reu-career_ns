const auth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/users/login');
    }
}

module.exports = auth;