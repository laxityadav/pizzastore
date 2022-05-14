const Sequelize = require('sequelize');

var sequelize = new Sequelize("postgres://postgres:mysecretpassword@localhost:5432/postgres");
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync()

module.exports = sequelize;