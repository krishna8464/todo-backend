const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authentication = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, process.env.KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            // console.log(user.user._id);
            req.body.userid = user.user._id
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

