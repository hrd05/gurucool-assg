const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const userData = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(userData.userId);
        // if (!user) {
        //     return res.status(401).json({ message: 'user not authorized' });
        // }
        req.userId = userData.userId;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json('User Not Authorized');
    }

}