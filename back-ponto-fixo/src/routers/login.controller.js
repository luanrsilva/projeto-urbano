const express = require('express');
const loginService = require('../services/login.service');

const router = express.Router();

router.post('' , (req, res) => {
    loginService.login(req.body, (response) => {
        res.status(response.status).send(response);
    });
});

module.exports = router;
