const mongoose = require('mongoose');
const Sector = require('../models/sector.model');
const response = require('../config/responses');
const cityService = require('./city.service');

const sectorService = (function () {

    const _createSector = async function (sector, callback) {
        try {
            const newSector = await Sector.create(sector);
            await cityService.addSectorToCity(sector.cityId, newSector._id);
            return callback(response.ok("Setor criado com sucesso.", newSector));
        } catch (err) {
            return callback(response.badRequest(err.message));
        }
    }

    const _addPropertyToSector = async function (sectorId, propertyId) {
        console.log(sectorId)
        await Sector.findByIdAndUpdate(mongoose.Types.ObjectId(sectorId), {$push: {properties: propertyId }});
    }

    const _getById = async function (cityId, callback) {
        try {
            const sector = await Sector.findById(mongoose.Types.ObjectId(cityId));
            return callback(response.ok("", sector));
        } catch (err) {
            return callback(response.notFound("Setor não encontrado"));
        }
    }

    return {
        createSector: _createSector,
        addPropertyToSector: _addPropertyToSector,
        getById: _getById,
    }
})();

module.exports = sectorService;