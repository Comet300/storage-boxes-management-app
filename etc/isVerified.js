const User = require("../models/user");

module.exports = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).lean().then((user) => {
        if (user) {
            if (user.isVerified == true)
                return next();
            res.redirect("/login?err=notVerified");
        }
    })
    return next();
}