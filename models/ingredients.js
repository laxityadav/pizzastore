const Sequelize = require('sequelize')
const sequelize = require("./connection")

const Ingredients = sequelize.define('ingredients', {
    crust: {
        type: Sequelize.ENUM('Hand Tossed', 'Wheat Thin Crust', 'Cheese Burst'),
    },
    vegTopping: {
        type: Sequelize.ENUM('Onion', 'Tomato', 'Capcicum', 'Black Olive'),
    },
    nonVegTopping: {
        type: Sequelize.ENUM('Chicken Tikka', 'Chicken Pepproni', 'Peri Peri Chicken'),
    }
});

module.exports = Ingredients;