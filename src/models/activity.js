'use strict';
module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
        date: DataTypes.DATE,
        activities: DataTypes.TEXT,
        challanges: DataTypes.TEXT,
        remarks: DataTypes.TEXT,
        status: DataTypes.TEXT,
        userId: DataTypes.INTEGER
    }, {});
    Activity.associate = function(models) {
        Activity.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'author',
            onDelete: 'CASCADE',
        })
    };
    return Activity;
};
