const express = require('express');
const router = express.Router();

const propertyService = require('../services/property.service');

router.post("/", async (req, res) => {
    await propertyService.createProperty(req.body, (response) => {
        res.status(response.status).send(response);
    })
});

module.exports = router;