const jwtToken = require("../auth-tokens/jwtToken")
const jwt = require(process.env.JWT_SECRET);


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({mess: "It seems you are trying to get an authorized access"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,jwtToken);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({err});
    }
};

module.exports = authMiddleware