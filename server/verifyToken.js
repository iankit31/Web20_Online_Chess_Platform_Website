const jwt = require('jsonwebtoken');
const Users = require('./models/Users')
const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token) {
        res.redirect('http://localhost:3000/login');
    }

    const verified = jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            res.redirect('http://localhost:3000/login');
        }
        else {
            console.log(decodedToken);
            next();
        }
    })

};

// check current user 
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await Users.findById(decodedToken.id);
                res.locals.user = user;

                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}
module.exports = { requireAuth, checkUser };
