const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const baseOptions = {
    discriminatorKey: '_type',
    collection: 'user',
    timestamps: true
};

const UserSchema = new mongoose.Schema({
    email :{
        type: String,
        required: [false, 'Email é requerido.'],
        unique: true,
        // validate: {
        //     validator: function(email) {
        //         return new RegExp('^([a-z]{2,}\\.[a-z]{2,}@[a-z].ufcg.edu.br)|^([a-z]{2,}\\.[a-z]{2,}\\.[a-z]{2,}@[a-z].ufcg.edu.br)$').test(email);
        //     },
        //     message: '{VALUE} Email inválido.'
        // }
    },
    password:  {
        type: String,
        required: true,
        select: false,
        validate: {
            validator: function(password) {
                return new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/).test(password);
            },
            message: 'A senha deve ter no mínimo 8 caracteres, e deve conter pelo menos um caractere maiúsculo, um minúsculo e um número. Não serão aceitos caracteres especiais.'
        }
    },
    statePassword: {
        type: String,
        enum: ["DEFAULT", "RECOVER","CHANGED"],
        default: "DEFAULT"
    },
    username : {
        type: String
    },
    profilePicture : {
        type: String,
        default: 'Não cadastrada'
    }
}, baseOptions);

UserSchema.methods.generatePassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.changeStatePassword = function () {
    if(this.statePassword === "DEFAULT"){
        this.statePassword = "CHANGED";
    } else if (this.statePassword === "RECOVER"){
        this.statePassword = "CHANGED";
    } else if (this.statePassword === "CHANGED") {
        this.statePassword = "RECOVER";
    }
};

UserSchema.pre("save", async function () {
    this.password = await this.generatePassword(this.password);
    // const preEmail = this.email.split("@")[0];
    // const username = preEmail;
    //
    // this.username = username;

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
