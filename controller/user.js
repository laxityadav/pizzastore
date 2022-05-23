const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

module.exports.createUser = async (req, res) => {
    console.log(req.body);
    const newUser = new User(req.body);
    const user = await User.findOne({
        where: {
            username: newUser.username
        }
    });
    if (user == null) {
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        const userCreated = await newUser.save();

        jwt.sign({ id: userCreated.id }, 'thisiskey', (err, token) => {
            res.status(201).json({ result: "Success", message: "User registered successfully!", token });
        });
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
            const token = jwt.sign({ _id: user.id }, "thisiskey");

            jwt.sign({ id: user.id }, 'thisiskey', (err, token) => {
                res.status(201).json({ result: "Success", message: "User logged In successfully!", token });
            });
        } else {
            res.status(400).json({ result: "Failure", message: "Username or password is incorrect!" });
        }
    } else {
        res.status(401).json({ result: "Failure", message: "User does not exist" });
    }
}

// module.exports.logoutUser = async (req, res) => {
//     jwt.destroy(req.token);

//     res.status(201).json({ result: "Success", message: "User logged out successfully!" });
// }