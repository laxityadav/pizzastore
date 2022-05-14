const Sequelize = require('sequelize')
const sequelize = require("./connection")

const Cart = sequelize.define('cart', {
    userId: {
        type: Sequelize.INTEGER,
    },
    ingredientId: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Cart;