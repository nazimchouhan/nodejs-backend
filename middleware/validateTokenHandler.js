const asynchandler=require('express-async-handler');
const jwt = require('jsonwebtoken');

const ValidateTokenHandler = asynchandler(async (req, res, next) => {

    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        if(token) {
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded) => {
                    if (err) {
                        return res.status(401).json({ message: 'Invalid token' });
                    }
                    console.log(decoded);
                    req.user = decoded.user; // Attach user info to request object
                    next(); // Call the next middleware or route handler
                });
            } catch (error) {
                res.status(401).json({ message: 'Invalid token' });
            }
        } else {
            res.status(401).json({ message: 'Token not found' });
        }
    }

});
module.exports = ValidateTokenHandler;