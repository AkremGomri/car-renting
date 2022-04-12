const Owner = require('../models/owner');
const Voiture = require('../models/voiture');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken')
const { ownerSignUp } = require('../helpers/validation_schema');

// exports.createOwner = (req, res, next) => {
//     delete req.body._id;
//     const owner = new Owner({
//       ...req.body
//     });
//     owner.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistréeeee !'}))
//       .catch(error => res.status(400).json({ error }));
//   };

  exports.getAllOwner = (req, res, next) => {
    Owner.find()
      .then(owner => {res.status(200).json(owner)})
      .catch(error => res.status(400).json({ error }));
  };

    exports.getOneOwner = (req, res, next) => {
      Owner.findOne({ _id: req.params.id })
        .then(owner => {
          if( req.auth.userId != req.params.id){
            return res.status(401).json({ error: new Error('Requete non autorisée')});
          }  
          res.status(200).json(owner)
        })
        .catch(error => {
          res.status(404).json({ message: "owner introuvable !", error })
        });
    };
    
    exports.modifyOwner = (req, res, next) => {
        Owner.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => {
            if( req.auth.userId != req.params.id){
              return res.status(401).json({ error: new Error('Requete non autorisée')});
            }  
            res.status(200).json({ message: 'Objet modifié !'})
        })
          .catch(error => res.status(400).json({ error }));
      }

      exports.deleteOwner = (req, res, next) => {
        Owner.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };

      exports.deleteAllOwner = (req, res, next) => {
        Owner.deleteMany({})
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };

      exports.deleteAllOwners = (req, res, next) => {
        Owner.deleteMany({})
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };

      // exports.getMesVoitures = (req, res, next) => {
      //   Owner.findById( req.params.id )
      //   .then(owner => {
      //     console.log("hi ", req.params.id);
      //     console.log(owner.voitures[0]);
      //     const ow = owner.populate('voitures').execPopulate();
      //     log('hello ', ow)
      //     console.log(ow);
      //     res.status(200).json(ow)
      //   })
      //   .catch(error => res.status(400).json({ error }));
      // };

      exports.getMyCars = (req, res, next) => {
        Voiture.find()
        .then(voitures => {
          const voi = voitures.filter(voiture => 
            voiture.ownerID == req.params.id
          )
          console.log(voi);
          res.status(200).json(voi)
        })
        .catch(error => {
          res.status(400).json({ error })});
      };
/******************************** auth ******************************************/
      exports.signUp = async (req, res, next) => {
        let validatedData = '';
        try {
          validatedData = await ownerSignUp.validateAsync(req.body);
        }
        catch ( err ) { 
          res.status(422).json({ err })
          throw new Error(err)
        }
        bcrypt.hash( validatedData.motDePasse, 10 )
        .then(hash => {
          delete validatedData._id;
          const owner = new Owner({
            ...validatedData,
            motDePasse: hash
          });
          owner.save()
            .then(() => res.status(201).json({ message: 'Objet enregistréeeee !'}))
            .catch(error => res.status(400).json({ error : new Error('problem lenna') }));
        })
        .catch( error => res.status(500).json({error : new Error('problem de hashage')})
        )}

      exports.signIn = (req, res, next) => {
        Owner.findOne({ pseudo: req.body.pseudo })
        .then( owner => {
          if(!owner){
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.motDePasse, owner.motDePasse)
           .then( valid => {
             if(!valid){
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
             }
             res.status(200).json({
               ownerId: owner._id,
               token: jwt.sign(
                 {userId: owner._id},
                 'RANDOM_TOKEN_SECRET',
                 { expiresIn: '24h'}
                )
             })
           })
           .catch(error => res.status(500).json({ error: error.message }));
          })
        .catch( error => console.log("problem de base de donnée find one owner, ", error.message))
      }