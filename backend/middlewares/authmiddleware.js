
const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check whether token exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Access token missing'
            });
        }
        
        const token = authHeader.split(' ')[1];

        const user = jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

module.exports = authmiddleware;
