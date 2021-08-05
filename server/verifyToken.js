const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

    const token = req.cookie.jwt;

    if (!token) {
        res.redirect('http://localhost:3000/login'); 
    }

    const verified = jwt.verify(token,'onlinechessgame',(err, decodedToken) => {
        if(err) {
            console.log(err.message);
            res.redirect('http://localhost:3000/login');
        }
        else {
            console.log(decodedToken);
            next();
        }
    })
    
};

module.exports = {requireAuth};
