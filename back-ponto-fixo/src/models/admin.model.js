const mongoose = require('mongoose');
const User = require("./user.model");

const AdminSchema = User.discriminator("Admin", new mongoose.Schema({

}));
const Admin = mongoose.model('Admin');
module.exports = Admin;
