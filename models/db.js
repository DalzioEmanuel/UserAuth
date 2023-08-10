const {Sequelize, Model, DataTypes} = require('sequelize');
try {
    const sequelize = new Sequelize('userauth', 'root', 'Emanuel2001$', {
        host: 'localhost',
        dialect: 'mysql'
    });
    console.log('Connected successfuly');
    module.exports = {sequelize, Sequelize, Model, DataTypes};
} catch (error) {
    console.log('Error' + error);
}

