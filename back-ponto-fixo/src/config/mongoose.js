const mongoose = require("mongoose");
let adminInitData = require("../bootstrap/admin.bootstrap");

mongoose.connect("mongodb://db:27017/ponto_fixo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    adminInitData();
    console.log('Connected to database');
}).catch(error => {
    console.log('Unable to connect to database', error);
})
