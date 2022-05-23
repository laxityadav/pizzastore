const jwt = require('jsonwebtoken');

//Verify Token
module.exports = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set token
        req.token = bearerToken;
        
        try {
            const verifiedToken = await jwt.verify(req.token, 'thisiskey')
            req.userId = verifiedToken.id;
        } catch (error) {
            res.status(403).json({ result: "Error", message: "User Authentication Failed!"});
            return;
        }
        next();
    } else {
        res.status.json({ result: "Error", message: "User Authentication Failed!"});
    }
};