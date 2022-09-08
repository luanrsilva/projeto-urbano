const mongoose = require("mongoose");
let adminInitData = require("../bootstrap/admin.bootstrap");

mongoose.connect("mongodb://localhost:27017/ponto-fixo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    adminInitData();
    console.log('Connected to database');
}).catch(error => {
    console.log('Unable to connect to database', error);
})
