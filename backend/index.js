//Express
const express = require('express');
const app = express();
const port = 36;

//String de Conexão
const connection = require('./database/database');

//BodyParser
const bodyParser = require('body-parser');

//Controllers
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

//Models
const Article = require('./articles/Article');
const Category = require('./categories/Category');

//Database
connection
    .authenticate().then(() => {
        console.log('#Servidor# Postgres LIVE!');
    }).catch((error) => {
        console.log(error);
    });

app.listen(port, () => console.log('#Servidor# NodeJs LIVE, porta: ' + port));

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Mapea a rota, lembrar de usar um prefixo /knowleged
app.use('/', categoriesController);
app.use('/', articlesController);


//Rota index
app.get('/', (req, res) => res.render('index'));