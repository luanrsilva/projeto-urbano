const mongoose = require('mongoose');
const Property = require('../models/property.model');
const sectorService = require('./sector.service');
const cityService = require('./city.service');
const response = require('../config/responses');

const propertyService = (function () {

    const _createProperty = async function (property, callback) {
        try {
            const newProperty = await Property.create(property);
            console.log('AAAA', property)
            console.log('NEW', newProperty)
            await sectorService.addPropertyToSector(property.sectorId, newProperty._id);
            await cityService.addPropertyToCity(property.cityId, newProperty._id);
            return callback(response.ok("Propriedade adicionada com sucesso.", newProperty));
        } catch (err) {
            return callback(response.badRequest(err.message));
        }
    }

    const _getAll = async function (callback) {
        try {
            const properties = await Property.find();
            return callback(response.ok("", properties));
        } catch (err) {
            return callback(response.badRequest("Erro ao recuperar propriedades"));
        }
    }

    const _getById = async function (cityId, callback) {
        try {
            const property = await Property.findById(mongoose.Types.ObjectId(cityId));
            return callback(response.ok("", property));
        } catch (err) {
            return callback(response.notFound("Propriedade não encontrada"));
        }
    }

    return {
        createProperty: _createProperty,
        getAll: _getAll,
        getById: _getById,
    }
})();

module.exports = propertyService;