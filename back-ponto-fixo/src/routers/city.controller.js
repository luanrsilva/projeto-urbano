const express = require('express');
const router = express.Router();

const cityService = require('../services/city.service');
const {response} = require("express");

router.post("/", async (req, res) => {
    await cityService.createCity(req.body, (response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['City']
            #swagger.description = 'Endpoint to add a city.' */
    })
});

router.get("/", async (req, res) => {
    await cityService.getAll((response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['City']
            #swagger.description = 'Endpoint to get all cities.' */
    })
})

router.get("/:id", async (req, res) => {
    await cityService.getById(req.params.id, (response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['City']
            #swagger.description = 'Endpoint to get city by ID.' */
    })
});

router.get("/:id/sectors", async (req, res) => {
    await cityService.getCitySectors(req.params.id, (response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['City']
            #swagger.description = 'Endpoint to get city sectors.' */
    })
});

router.get("/:id/properties", async (req, res) => {
    await cityService.getCityProperties(req.params.id, (response) => {
        res.status(response.status).send(response);
        /*  #swagger.tags = ['City']
            #swagger.description = 'Endpoint to get city properties.' */
    })
});

module.exports = router;