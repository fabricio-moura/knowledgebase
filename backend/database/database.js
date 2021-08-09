const Sequelize = require('sequelize');

//Conexão Postgres
const connection = new Sequelize('knowledge', 'postgres', 'admin', {
    dialect: 'postgres',
    dialectOptions: {}
});

module.exports = connection;