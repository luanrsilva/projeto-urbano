const mongoose = require('mongoose');

const baseOptions = {
    timestamps: true
};

const PropertySchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: [true, 'Identificador do imóvel é obrigatório.'],
        unique: true,
    },
    houseNumber: {
        type: Number,
    },
    landArea: {
        type: Number,
    },
    buildingArea: {
        type: Number,
    },
    ownerName: {
        type: String
    },
    ownerCPF: {
        type: String
    },
    estimatedValue: {
        type: Number
    },
    iptu: {
        type: Number
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        require: true
    },
    sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sector"
    }
}, baseOptions);

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;