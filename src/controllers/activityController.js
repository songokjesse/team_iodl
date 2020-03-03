
const models = require('../models');

const createActivity = async (req,res)=> {
    try {
        const theActivity = {
            userId: req.user,
            date: req.body.date,
            activities: req.body.activities,
            challanges: req.body.challanges,
            remarks: req.body.remarks,
            status: req.body.status,
        }
        const {userID, title, content } = theActivity;
        const Activity = await models.Activity.create(theActivity);
        return res.status(201).json({
            activity,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const getAllActivities = async (req, res) => {
    try {
        const activities = await models.Activity.findAll({
            include: [
                {
                    model: models.User,
                    as: 'author'
                }
            ]
        });
        return res.status(200).json({ activities });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getActivityById = async (req, res) => {
    try {
        const { activityId } = req.params;
        const activity = await models.Activity.findOne({
            where: { id: activityId },
            include: [
                {
                    model: models.User,
                    as: 'author'
                }
            ]
        });
        if (activity) {
            return res.status(200).json({ activity });
        }
        return res.status(404).send('Activity with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateActivity = async (req, res) => {
    try {
        const { activityId } = req.params;
        const [ updated ] = await models.Activity.update(req.body, {
            where: { id: activityId }
        });
        if (updated) {
            const updatedActivity = await models.Activity.findOne({ where: { id: activityId } });
            return res.status(200).json({ activity: updatedActivity });
        }
        throw new Error('Activity not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { activityId } = req.params;
        const deleted = await models.Activity.destroy({
            where: { id: activityId }
        });
        if (deleted) {
            return res.status(204).send("Activity deleted");
        }
        throw new Error("Activity not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    deleteActivity,
};
