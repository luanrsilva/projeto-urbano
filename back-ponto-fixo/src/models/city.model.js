const mongoose = require('mongoose');

const baseOptions = {
    timestamps: true
};

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
}, baseOptions);

const City = mongoose.model('City', CitySchema);

module.exports = City;