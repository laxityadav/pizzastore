const express = require('express');
const ExpressError = require("./utils/ExpressError");
const app = express();
const cors = require('cors')

app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})


const corsConfig = { origin: true, credentials: true };

app.use(cors(corsConfig));


const userRoutes = require("./route/user");
const cartRoutes = require("./route/cart");
const orderRoutes = require("./route/order");

//Define the routes
app.use('/', userRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

//Dummy route
app.post('/dummy', (req, res) => {
    console.log(req.body);
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