const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = mongoose.Schema({
    idClient: {type: Schema.Types.ObjectId, ref:'Client', required: true},
    idVoiture: {type: Schema.Types.ObjectId, ref:'Voiture', required: true},
    DateMin: { type: Date, required: true },
    DateMax: { type: Date, required: true },
    lieuxDeLivraison: { type: String },
    lieuxDeRecuperation: { type: String },
    Options: [ String ],    
    OptionSupplementaires: { type: String },    
    IsDelivred: { type: Boolean, default: false },
    IsGivenBack: { type: Boolean,  default: false  },
});

reservationSchema.index({ idClient: 1, idVoiture: 1, DateMin: 1 }, { unique: true });
reservationSchema.index({ idClient: 1, idVoiture: 1, DateMax: 1 }, { unique: true });

module.exports = mongoose.model('Reservation', reservationSchema);