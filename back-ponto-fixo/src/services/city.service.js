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

    return {
        createCity: _createCity,
        addSectorToCity: _addSectorToCity,
        addPropertyToCity: _addPropertyToCity
    }
})();

module.exports = cityService;