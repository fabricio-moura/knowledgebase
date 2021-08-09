const express = require('express');
const app = express();
const port = 36;
const bodyParser = require('body-parser');
const connection = require('./database/database');

//Database
connection
    .authenticate().then(() => {
        console.log('Servidor Postgres LIVE!');
    }).catch((error) => {
        console.log(error);
    });

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Rota index
app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log('Servidor NodeJs LIVE, porta: ' + port));