const Client = require('../models/client');
const Owner = require('../models/owner');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken')
const OwnerCtr  = require('./owner')

exports.auth = async (req, res, next) => {
    Client.findOne({ pseudo: req.body.pseudo })
    .then(client => {
        if (!client) {
            console.log("wsolna lenna");
            return OwnerCtr.signIn(req, res)
            console.log("wsolna lenna 2");
        }
        bcrypt.compare(req.body.motDePasse, client.motDePasse)
        .then(valid => {
            if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
            clientId: client._id,
            token: jwt.sign(
                { userId: client._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h'}
            )
            });
        })
        .catch(error => res.status(500).json({ error: error.message }));
    })
    .catch((error) => {
        res.status(500).json({ error: error.message })
    });
}