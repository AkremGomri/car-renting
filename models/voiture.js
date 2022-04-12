const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voitureSchema = mongoose.Schema({
  matricule: { type: String, required: true, unique: true },
  marque: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  prix_par_heure: { type: Number, required: true },
  color: {type: String, required: true},
  ownerID: {type: Schema.Types.ObjectId, ref:'Owner', required: true}
});

module.exports = mongoose.model('Voiture', voitureSchema);