const Cart = require("../models/cart")
const Ingredient = require("../models/ingredients")

module.exports.addToCart = async (req, res) => {
    //console.log(req.body);
    const ingredient = new Ingredient(req.body);
    const newPizza = await ingredient.save();
    //console.log(newPizza);
    const cartItem = new Cart();
    cartItem.userId = 1;
    cartItem.ingredientId = newPizza.id;
    await cartItem.save();

    res.status(201).json({ result: "Success", message: "Added to cart successfully!" });
}