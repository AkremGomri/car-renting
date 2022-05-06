const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true },
    entrepriseName: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    addresse: { type: String, required: true },
    CIN: { type: Number, required: true, unique: true },
    date_de_naissance: { type: Date, required: true },
    entrepriseName: { type: String, required: true, unique: true },
    voitures:[
        { type: Schema.Types.ObjectId, ref: 'Voiture' }
      ],
      imageUrl: { type: String }
});

module.exports = mongoose.model('Owner', ownerSchema);