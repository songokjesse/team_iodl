'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    }, {});
    User.beforeSave((user, options)=>{
        if(user.changed('password')){
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
    });
    User.prototype.comparePassword = (passw, cb)=>{
        bcrypt.compare(passw, this.password, (err, isMatch)=>{
            if(err){
                return cb(err);
            }
            cb(null, isMatch);
        })
    }
    User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'posts',
            onDelete: 'CASCADE',
        });

        User.hasMany(models.Comment, {
            foreignKey: 'userId',
            as: 'comments',
            onDelete: 'CASCADE',
        });
    };
    return User;
};
