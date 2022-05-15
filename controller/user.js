const User = require("../models/user")
const bcrypt = require('bcrypt')

module.exports.createUser = async (req, res) => {
    //console.log(req.body);
    const newUser = new User(req.body);
    const user = await User.findOne({
        where: {
            username: newUser.username
        }
    });
    if (user == null) {
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        res.status(201).json({ result: "Success", message: "User created successfully!" });
    } else {
        res.status(409).json({ result: "Failure", message: "Username already exists!" });
    }
}

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username: username,
        }
    });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        res.status(201).json({ result: "Success", message: "User logged In successfully!" });
      } else {
        res.status(400).json({ result: "Failure", message: "Username or password is incorrect!" });
      }
    } else {
      res.status(401).json({ result: "Failure", message: "User does not exist" });
    }
}