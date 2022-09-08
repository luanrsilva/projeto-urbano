const User = require("../models/user.model");
const response = require('../config/responses');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const TokenBlacklist = require("../models/blacklist-token.model");

const loginService = (function () {

    const _generateToken = function (params) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: authConfig.timer
        });
    };

    const _validateLogin = async function (user, callback) {
        const { email, password } = user;

        try {

            const user = await User.findOne({ email: { $regex: new RegExp("^" + (".*" + email.toLowerCase() + ".*"), "i") } }).select('+password');

            if (!user)
                return callback(response.notFound("Usuário não encontrado."));

            if (!await user.validatePassword(password))
                return callback(response.notFound("Email ou Senha inválidos."));

            user.password = undefined;
            user.profilePicture = undefined;

            callback(response.ok("Login realizado com sucesso.", {
                user: user,
                token: _generateToken({ id: user.id })
            }));

        } catch (err) {
            callback(response.notFound("Não foi possível realizar o login."));
        }
    };

    const _addTokenToBlacklist = async (token) => {
        await TokenBlacklist.create({ token });
    };

    const _tokenExists = async function(token) {
        return TokenBlacklist.findOne({ token: token });
    };

    const _logout = async (token, callback) => {

        if(!token)
            return callback(response.badRequest("Nenhum token fornecido."));

        if(!await _tokenExists(token)) {
            await _addTokenToBlacklist(token);
            return callback(response.ok("Logout realizado com sucesso."));
        }

        callback(response.notModified('Logout já foi realizado.'))
    };

    // const verifyEmail = async function (email, callback) {
    //     if (!email.includes('.ufcg.edu.br')) {
    //         callback(response.unauthorized('É necessário realizar login com o email acadêmico!'));
    //         return false;
    //     } else {
    //         return true;
    //     }
    // };

    return {
        login: _validateLogin,
        logout: _logout
    }
})();

module.exports = loginService;
