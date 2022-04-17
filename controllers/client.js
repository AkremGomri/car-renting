const Client = require('../models/client');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { clientSignUp } = require('../helpers/validation_schema');

// exports.createClient = (req, res, next) => {
//     delete req.body._id;
//     const client = new Client({
//       ...req.body
//     });
//     client.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistréeeee !'}))
//       .catch(error => res.status(400).json({ error }));
//   };

  exports.getAllClient = (req, res, next) => {
    Client.find()
      .then(client => {res.status(200).json(client)})
      .catch(error => res.status(400).json({ error }));
  };

    exports.getOneClient = (req, res, next) => {
      Client.findOne({ _id: req.params.id })
        .then(client => res.status(200).json(client))
        .catch(error => res.status(404).json({ error }));
    };
    
    exports.modifyClient = (req, res, next) => {
        Client.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      }

      exports.deleteClient = (req, res, next) => {
        Client.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };

      exports.deleteAllClients = (req, res, next) => {
        Client.deleteMany({})
          .then(() => res.status(200).json({ message: 'Tout les Objets sont supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };


      exports.signUp = async (req, res, next) => {
        let validatedData = '';
        try {
          validatedData = await clientSignUp.validateAsync(req.body);
        }
        catch ( err ) { 
          res.status(422).json({ err })
          throw new Error(err)
        }
        delete validatedData._id;
        bcrypt.hash(validatedData.motDePasse, 10)
        .then(hash => {
          const client = new Client({
            ...validatedData,
            motDePasse: hash
          });
          client.save()
            .then(() => {
              res.status(201).json({  message: 'Utilisateur créé !' })
            })
            .catch(error => 
              {
                console.log(" incapable de savegarder avec erreur:  ", error);
                res.status(400).json({  error: error.message })
              }
            );
        })
        .catch(error => {
          console.log("erreur hashage: ",error)
          res.status(500).json({ error: error.message });
      });
      }

      exports.signIn = async (req, res, next) => {
          Client.findOne({ pseudo: req.body.pseudo })
        .then(client => {
          if (!client) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
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
        .catch(error => res.status(500).json({ error: error.message }));
      }

