const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = { userId };
        if( req.body.userId && req.body.userId !== userId ){
            throw 'invalid userID';
        } else {
            next();
        }
    } catch {
        console.log("erreur d'authentification");
        res.status(401).json({
        error: ('Invalid request!')
        })
    }
}