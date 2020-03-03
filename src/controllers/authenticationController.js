const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult} = require('express-validator');
const Model = require('../models');
const UserRegister = [
    //Field Validation
    body('name').isLength({ min: 5}),
    body('email').isEmail(),
    body('password').isLength({ min: 5}),
    body('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),

    //Sanitize Form inputs
    // sanitizeBody('email').escape(),
    // sanitizeBody('name').escape(),
    // sanitizeBody('password').escape(),
    //
    //Process Form Input
    (req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // Find if User Exists
        Model.User.findOne( { where: { email: req.body.email}}).then( (results)=>{
            if (results) {
                return res.status(401).send({
                    message: 'Registration failed. "User Already Exsists.',
                });
            } else {
                Model.User
                    .create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                    .then((results) => res.status(201).send({
                            status: "Success",
                            data :{
                                message : "User account successfully created",
                                userID : results.id,
                                email: results.email
                            }
                        })
                    )
                    .catch((error) => {
                        res.status(400).send(error);
                        next();
                    });
            }
        }).catch((e)=>{
            next(e);
        })

    }
];

const UserLogin = [
    //Field Validation
    body('email').isEmail(),
    body('password').isLength({ min: 5}),

    //Sanitize Form inputs
    // sanitizeBody('email').escape(),
    // sanitizeBody('password').escape(),

    //Process Form Input
    (req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422)
                .json({ errors: errors.array() });
        }
        Model.User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                if (!user) {
                    return res.status(401).send({
                        message: 'Authentication failed. Check User details.',
                    });
                }
                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                //
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }
                const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                    expiresIn: 86400 // 24 hours
                });
                res.status(200).send({
                    id: user.id,
                    email: user.email,
                    token: token
                });
            })
            .catch((error) => res.status(400).send(error));
    }
];
module.exports = {
    UserRegister,
    UserLogin,
};
