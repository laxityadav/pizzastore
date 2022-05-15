const Cart = require("../models/cart")
const Ingredient = require("../models/ingredients")

module.exports.addToCart = async (req, res) => {
    const ingredient = new Ingredient(req.body);
    const newPizza = await ingredient.save();
    const cartItem = new Cart();         //TODO: has to be optimized
    cartItem.userId = req.userId;
    cartItem.ingredientId = newPizza.id;
    await cartItem.save();

    res.status(201).json({ result: "Success", message: "Added to cart successfully!" });
}

module.exports.showCart = async (req, res) => {
    const AllItem = await Cart.findAll({
        where: {
            userId: req.userId
        }
    });
    const items = [];
    for (let i = 0; i < AllItem.length; i++) {      //TODO: has to be optimized
        const ingredient = await Ingredient.findByPk(AllItem[i].dataValues.ingredientId);
        items.push(ingredient);
    }
    res.status(201).json(items);
}