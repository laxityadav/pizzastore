const Cart = require("../models/cart")
const Ingredient = require("../models/ingredients")

module.exports.addToCart = async (req, res) => {
    //console.log(req.body);
    const ingredient = new Ingredient(req.body);
    const newPizza = await ingredient.save();
    //console.log(newPizza);
    const cartItem = new Cart();         //TODO: has to be optimized
    cartItem.userId = 1;
    cartItem.ingredientId = newPizza.id;
    await cartItem.save();

    res.status(201).json({ result: "Success", message: "Added to cart successfully!" });
}

module.exports.showCart = async (req, res) => {
    const AllItem = await Cart.findAll({
        where: {
            userId: 1
        }
    });
    const items = [];
    for (let i = 0; i < AllItem.length; i++) {      //TODO: has to be optimized
        //console.log(AllItem[i].dataValues.ingredientId);
        const ingredient = await Ingredient.findByPk(AllItem[i].dataValues.ingredientId);
        items.push(ingredient);
    }
    //console.log(items);
    res.status(201).json(items);
}