const mongoose = require('mongoose');

const SectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome do setor é obrigatório.']
    },
    value: {
        type: Number,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City"
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }]
});

const Sector = mongoose.model('Sector', SectorSchema);

module.exports = Sector;