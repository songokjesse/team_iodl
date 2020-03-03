
const { Router } = require('express');
const AuthenticationController = require('../ controllers/authenticationController');
const { userValidationRules, validate} = require('../middleware/AuthMiddleware');

const router = Router();

router.post('/signup', AuthenticationController.UserRegister);
router.post('/login', AuthenticationController.UserLogin);


module.exports = router;
