const Order = require("../models/order")
const Cart = require("../models/cart")
//const Ingredient = require("../models/ingredients")

module.exports.saveOrder = async (req, res) => {
    //  TODO: need to delete cart items also
    const cartItems = await Cart.findAll({
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