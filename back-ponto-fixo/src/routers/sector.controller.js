const express = require('express');
const router = express.Router();

const sectorService = require('../services/sector.service');

router.post("/", async (req, res) => {
    await sectorService.createSector(req.body, (response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['Sector']
            #swagger.description = 'Endpoint to add a sector.' */
    })
});

router.get("/:id", async (req, res) => {
    await sectorService.getById(req.params.id, (response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['Sector']
            #swagger.description = 'Endpoint to get sector by ID.' */
    })
});

module.exports = router;