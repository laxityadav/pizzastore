const Sequelize = require('sequelize')
const sequelize = require("./connection")

const Order = sequelize.define('order', {
    userId: {
        type: Sequelize.INTEGER,
    },
    ingredientId: {
        type: Sequelize.ARRAY(Sequelize.DataTypes.INTEGER)
    }
});

module.exports = Order;