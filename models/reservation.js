const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = mongoose.Schema({
    idClient: {type: Schema.Types.ObjectId, ref:'Client', required: true},
    idVoiture: {type: Schema.Types.ObjectId, ref:'Voiture', required: true},
    Date: { type: String, required: true },
    lieuxDeLivraison: { type: String, required: true },
    IsDelivred: { type: Boolean, default: false },
    IsTaken: { type: Boolean,  default: false  },
});

reservationSchema.index({ idVoiture: 1, idVoiture: 1, Date: 1 }, { unique: true });

module.exports = mongoose.model('Reservation', reservationSchema);