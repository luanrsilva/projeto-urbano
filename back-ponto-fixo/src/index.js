const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

require('./config/mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
})

require('./config/router')(app);

app.listen(8080, () => {
    console.log('app is running on the port 8080');
})
