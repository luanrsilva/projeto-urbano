const mongoose = require('mongoose');

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
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        require: true
    },
    sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sector"
    }
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;