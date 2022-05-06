const Owner = require('../models/owner');
const Voiture = require('../models/voiture');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken')
const { ownerSignUp } = require('../helpers/validation_schema');

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
      console.log(req);
      console.log("req.file: ",req.file);

      const ownerObject = req.file ?
      {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/imagess/${req.file.filename}`
      } : { ...req.body };
      Owner.updateOne({ _id: req.params.id }, { ...ownerObject, _id: req.params.id })
        .then(() => {
          if( req.auth.userId != req.params.id){
            return res.status(401).json({ error: new Error('Requete non autorisée')});
          }  
          res.status(200).json({ message: 'Objet modifié !'})
      })
        .catch(error => res.status(400).json({ error }));
    }

    exports.ModifyMe = (req, res, next) => {
      Owner.findByIdAndUpdate(req.auth.userId, {
        pseudo: req.body.pseudo,
        entrepriseName: req.body.entrepriseName,
        nom: req.body.nom,
        prenom: req.body.prenom,
        Email: req.body.Email,
        telephone: req.body.telephone,
        addresse: req.body.addresse,
        CIN: req.body.CIN,
        date_de_naissance: req.body.date_de_naissance
        })
        .then(() => {
          res.status(200).json({ message: 'Objet modifié !'})
      })
        .catch(error => {
          res.status(400).json({ error })
      });
    }

    exports.getMyProfile = (req, res, next) => {
      Owner.findById( req.auth.userId )
        .then((owner) => {
          res.status(200).json({
            pseudo: owner.pseudo,
            entrepriseName: owner.entrepriseName,
            nom: owner.nom, 
            prenom: owner.prenom, 
            Email: owner.Email, 
            telephone: owner.telephone, 
            addresse: owner.addresse, 
            CIN: owner.CIN,
            date_de_naissance: owner.date_de_naissance,
            voitures: owner.voitures
          })
      })
        .catch(error => res.status(400).json({ error }));
    }

      exports.deleteOwner = (req, res, next) => {
        if( req.auth.userId != req.params.id){
          return res.status(401).json({ error: new Error('Requete non autorisée')});
        }  
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
      //     ow.save()
      //     log('hello ', ow)
      //     console.log(ow);
      //     res.status(200).json(ow)
      //   })
      //   .catch(error => res.status(400).json({ error }));
      // };

      exports.getOwnerCarsById = (req, res, next) => {
        Voiture.find()
        .then(voitures => {
          const voi = voitures.filter(voiture => 
            voiture.ownerID == req.params.id
          )
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
            .catch(error => {
              err = error.message.split(' ')[11];
              err = err.substring(0, err.length-1);
              console.log(err);
              res.status(400).json({ message: 'problem coté la base de donnée', err })});
        })
        .catch( error => res.status(500).json({message : 'problem de hashage'})
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