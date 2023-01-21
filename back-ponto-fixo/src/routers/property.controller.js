const express = require('express');
const router = express.Router();

const propertyService = require('../services/property.service');

router.post("/", async (req, res) => {
    await propertyService.createProperty(req.body, (response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['Property']
            #swagger.description = 'Endpoint to add a property.' */
    })
});

router.get("/", async (req, res) => {
    await propertyService.getAll((response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['Property']
            #swagger.description = 'Endpoint to get all properties.' */
    })
})

router.get("/:id", async (req, res) => {
    await propertyService.getById(req.params.id, (response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['Property']
            #swagger.description = 'Endpoint to get property by ID.' */
    })
});

module.exports = router;