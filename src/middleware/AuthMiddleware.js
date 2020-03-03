const jwt = require('jsonwebtoken');
const Model = require('../models');

module.exports = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        return res.status(401).send({ 'message': 'Token is not provided' });
    }
    const decodedToken = jwt.verify(token,  process.env.SECRET);
    const userId = decodedToken.id;
    Model.User.findOne({ where : {'id': userId}}).then( (results)=> {
        if (!results) {
            res.status(401)
                .send({ 'message': 'The token you provided is invalid' });
        }
        req.user = results.id;
        next();
    }).catch( (err)=>{
        next(err);
    });
};

 
