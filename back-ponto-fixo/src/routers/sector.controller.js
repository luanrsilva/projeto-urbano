const express = require('express');
const router = express.Router();

const sectorService = require('../services/sector.service');

router.post("/", async (req, res) => {
    await sectorService.createSector(req.body, (response) => {
        res.status(response.status).send(response);
    })
});

module.exports = router;