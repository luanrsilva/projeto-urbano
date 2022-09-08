const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome da cidade é obrigatório.']
    },
    iptuAliquot: {
        type: Number
    },
    sectors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sector"
    }],
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }]
});

const City = mongoose.model('City', CitySchema);

module.exports = City;