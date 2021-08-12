const Sequelize = require('sequelize');

//Conexão Postgres
const connection = new Sequelize('knowledge', 'postgres', 'admin', {
    dialect: 'postgres',   
    dialectOptions: {
        useUTC: false, // for reading from database
        dateStrings: true,            
        typeCast: true
    },
    timezone: '-03:00', // for writing to database 
        
    
});

module.exports = connection;