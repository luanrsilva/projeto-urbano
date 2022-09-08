const mongoose = require('mongoose');
const Sector = require('../models/sector.model');
const response = require('../config/responses');
const cityService = require('./city.service');

const sectorService = (function () {

    const _createSector = async function (sector, callback) {
        try {
            const newSector = await Sector.create(sector);
            await cityService.addSectorToCity(newSector.city, newSector.id);
            return callback(response.ok("Setor criado com sucesso.", newSector));
        } catch (err) {
            return callback(response.badRequest(err.message));
        }
    }

    const _addPropertyToSector = async function (sectorId, propertyId) {
        const sector = await Sector.findById(mongoose.Types.ObjectId(sectorId));
        sector.properties.push(propertyId);

        await sector.save();
    }

    return {
        createSector: _createSector,
        addPropertyToSector: _addPropertyToSector
    }
})();

module.exports = sectorService;