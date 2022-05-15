const Order = require("../models/order")
const Cart = require("../models/cart")
const Ingredient = require("../models/ingredients")

module.exports.saveOrder = async (req, res) => {
    const cartItems = await Cart.findAll({
        where: {
            userId: 1
        }
    });
    //delete cart items
    await Cart.destroy({
        where: {
            userId: 1
        }
    });
    const ingredients = [];
    for (let i = 0; i < cartItems.length; i++) {
        ingredients.push(cartItems[i].dataValues.ingredientId);
    }
    const order = new Order();
    order.userId = 1;
    order.ingredientId = ingredients;
    await order.save();
    res.status(201).json({ result: "Success", message: "Order placed successfully!" });
}

module.exports.allOrders = async (req, res) => {
    const orderItems = await Order.findAll({
        where: {
            userId: 1
        }
    });
    const allItems = [];
    for (let i = 0; i < orderItems.length; i++) {
        const order = [];
        for(let j=0; j<orderItems[i].dataValues.ingredientId.length; j++) {
            const ingredient = await Ingredient.findByPk(orderItems[i].dataValues.ingredientId[j]);
            order.push(ingredient);
        }
        allItems.push(order);
    }
    
    res.status(201).json(allItems);
}