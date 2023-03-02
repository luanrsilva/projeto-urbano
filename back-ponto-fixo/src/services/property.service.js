const mongoose = require('mongoose');
const Property = require('../models/property.model');
const City = require('../models/city.model');
const sectorService = require('./sector.service');
const cityService = require('./city.service');
const response = require('../config/responses');
const Sector = require("../models/sector.model");

const propertyService = (function () {

    const _createProperty = async function (property, callback) {
        try {
            const newProperty = await _buildProperty(property);
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

    const _buildProperty = async function (property) {
        try {
            const city = await City.findById(property.cityId);
            const sector = await Sector.findById(property.sectorId);
            property.estimatedValue = sector.value * property.landArea;
            property.iptu = (city.iptuAliquot * property.estimatedValue)/100;
            return await Property.create(property);
        }
        catch (err) {
            console.log(err.message);
        }

    }

    return {
        createProperty: _createProperty,
        getAll: _getAll,
        getById: _getById,
    }
})();

module.exports = propertyService;