const mongoose = require('mongoose');
const Sector = require('../models/sector.model');
const response = require('../config/responses');
const cityService = require('./city.service');

const sectorService = (function () {

    const _createSector = async function (sector, callback) {
        try {
            const newSector = await Sector.create(sector);
            await cityService.addSectorToCity(sector.cityId, newSector.id);
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

    const _getSectorsByCity = async function (cityId, callback) {
        try {
            console.log(cityId)
            const sectors = await Sector.find({city: mongoose.Types.ObjectId(cityId)});
            console.log(sectors)
            return callback(response.ok("", sectors));
        } catch (err) {
            return callback(response.badRequest("Erro ao recuperar setores"));
        }
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
        getSectorsByCity: _getSectorsByCity,
        getById: _getById,
    }
})();

module.exports = sectorService;