const User = require("../models/user")
//const ExpressError = require("../utils/ExpressError");

module.exports.createUser = async (req, res) => {
    console.log(req.body);
    const newUser = new User(req.body);
    try {
        await newUser.save();
    } catch (error) {
        console.log(error);
    }


    res.status(201).json({ result: "Success", message: "Plan created successfully!" });
}