'use strict';

const {Sequelize, DataTypes, Model} = require('sequelize');

/**
 * Main skeleton for a user, can be extended to specific types of users
 * @class
 */

class User extends Model {

    /**
     * Creates a user model with attributes
     * @param {*} Sequelize 
     * @returns 
     */
    static createModel(Sequelize){
        User.init(
            {
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                first_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                last_name: {    
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                personal_num: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                role_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
            },
            {Sequelize, modelName: 'User', paranoid: true}
        );
        return User;
    }
}

module.exports = User;