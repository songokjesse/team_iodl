const express = require('express');
const ActivityRoutes = require('../routes/activities');
// const UserRoutes = require('../routes/users');
const AuthRoutes = require('../routes/Authentication');
const router = express.Router();

router.get('/', (req,res)=> {
    res.status(200).send({
        message: "TEAM IODL Backend API"
    });
});

// Authentication routes
router.use('/auth', AuthRoutes);

// Post routes
router.use('/activities', ActivityRoutes);

module.exports = router;
