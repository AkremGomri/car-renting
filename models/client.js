const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    CIN: { type: Number, required: true, unique: true },
    date_de_naissance: { type: Date, required: true }
});

module.exports = mongoose.model('Client', clientSchema);