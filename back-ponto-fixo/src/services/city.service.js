const mongoose = require('mongoose');
const City = require('../models/city.model');
const response = require('../config/responses');

const cityService = (function () {

    const _createCity = async function (city, callback) {
        try {
            const newCity = await City.create(city);
            return callback(response.ok("Cidade adicionada com sucesso.", newCity));
        } catch (err) {
            return callback(response.badRequest(err.message));
        }
    }

    const _addSectorToCity = async function (cityId, sectorId) {
        const city = await City.findById(mongoose.Types.ObjectId(cityId));
        city.sectors.push(sectorId);

        await city.save();
    }

    const _addPropertyToCity = async function (cityId, propertyId) {
        const city = await City.findById(mongoose.Types.ObjectId(cityId));
        city.properties.push(propertyId);

        await city.save();
    }

    const _getAll = async function (callback) {
        try {
            const cities = await City.find();
            return callback(response.ok("", cities));
        } catch (err) {
            return callback(response.badRequest("Erro ao recuperar cidades"));
        }
    }

    const _getById = async function (cityId, callback) {
        try {
            const city = await City.findById(mongoose.Types.ObjectId(cityId));
            return callback(response.ok("", city));
        } catch (err) {
            return callback(response.notFound("Cidade não encontrada"));
        }
    }

    return {
        createCity: _createCity,
        getAll: _getAll,
        getById: _getById,
        addSectorToCity: _addSectorToCity,
        addPropertyToCity: _addPropertyToCity
    }
})();

module.exports = cityService;