const express = require('express');

const app = express();

app.use(express.json());


const userRoutes = require("./route/user");

//Define the routes
app.use('/', userRoutes);

//Dummy route
app.get('/dummy', (req, res) => {
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