const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token authorization. Denied!' });
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid!' });
    }
}

module.exports = auth;