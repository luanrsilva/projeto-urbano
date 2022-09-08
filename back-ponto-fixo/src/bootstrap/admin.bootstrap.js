let Admin = require("../models/admin.model");

module.exports = function () {
    let admin = new Admin({
        email: "admin",
        password: "Admin123"
    });

    Admin.countDocuments({}, function (error, count) {
        if(error) {
            return error;
        } else if(count === 0){
            admin.save();
        }
    });
};
