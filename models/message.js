const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
    
    userType:{
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        refPath: 'userType'
    },
    // ownerId: { type: Schema.Types.ObjectId, ref: 'Owner' },
    // clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: function() { return this.ownerId === (null || undefined) } },
    message: { type: String, required: true },
    date: { type: Date, required: true},
    email: { type: String },
    nom: { type: String },
    prenom: { type: String }
});

module.exports = mongoose.model('Message', messageSchema);