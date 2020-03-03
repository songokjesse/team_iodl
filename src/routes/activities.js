const {Router} = require('express');
const activityController = require('../controllers/activityController');
const VerifyToken = require('../middleware/AuthMiddleware');
const router = Router();

router.post('/',  VerifyToken, activityController.createActivity);
router.get('/', activityController.getAllActivities);
router.get('/:activityId', VerifyToken, activityController.getActivityById);
router.put('/:activityId', VerifyToken, activityController.updateActivity);
router.delete('/:activityId', VerifyToken, activityController.deleteActivity);

module.exports = router;
