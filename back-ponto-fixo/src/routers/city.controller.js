const express = require('express');
const router = express.Router();

const cityService = require('../services/city.service');

router.post("/", async (req, res) => {
    await cityService.createCity(req.body, (response) => {
        res.status(response.status).send(response);
    })
});

module.exports = router;