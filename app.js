const express = require('express');
const ExpressError = require("./utils/ExpressError");
const app = express();
const auth = require("./middleware/auth");

app.use(express.json());


const userRoutes = require("./route/user");
const cartRoutes = require("./route/cart");
const orderRoutes = require("./route/order");

//Define the routes
app.use('/', userRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

//Dummy route
app.get('/dummy', auth, (req, res) => {
    res.send("Server is up and running");
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 400 } = err;
    if (!err.message) err.message = "Oh No !! Something went Wrong";
    res.status(statusCode).json({ result: "Error", message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));