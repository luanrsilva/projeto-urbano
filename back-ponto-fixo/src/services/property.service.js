const mongoose = require('mongoose');
const Property = require('../models/property.model');
const sectorService = require('./sector.service');
const cityService = require('./city.service');
const response = require('../config/responses');

const propertyService = (function () {

    const _createProperty = async function (property, callback) {
        try {
            const newProperty = await Property.create(property);
            await sectorService.addPropertyToSector(newProperty.sector, newProperty.id);
            await cityService.addPropertyToCity(newProperty.city, newProperty.id);
            return callback(response.ok("Propriedade adicionada com sucesso.", newProperty));
        } catch (err) {
            return callback(response.badRequest(err.message));
        }
    }

    return {
        createProperty: _createProperty,
    }
})();

module.exports = propertyService;