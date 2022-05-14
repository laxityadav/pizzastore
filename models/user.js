const Sequelize = require('sequelize')
const sequelize = require("./connection")

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    phonenumber: {
        type: Sequelize.STRING,
    },
    token: {
        type: Sequelize.STRING,
    }
});

module.exports = User;