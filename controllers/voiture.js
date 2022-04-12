const Voiture = require('../models/voiture');
const Owner = require('../models/owner');


exports.createVoiture = (req, res, next) => {
  
    console.log("d5alna");
    delete req.body._id;
    const voiture = new Voiture({
      ...req.body
    });

    Owner.findOne({ _id: voiture.ownerID })
    .then(owner => {
      owner.voitures.push(voiture._id)
      owner.save()
    })
    .catch(error => console.log(error));
    voiture.save()
      .then(() => res.status(201).json({ message: 'Objet enregistréeeee !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.getAllVoitures = (req, res, next) => {
    Voiture.find()
      .then(voitures => {res.status(200).json(voitures)})
      .catch(error => res.status(400).json({ error }));
  };

    exports.getOneVoiture = (req, res, next) => {
    Voiture.findOne({ matricule: req.params.matricule })
        .then(voiture => res.status(200).json(voiture))
        .catch(error => res.status(404).json({ error }));
    };


    exports.modifyVoiture = (req, res, next) => {
      Voiture.findOne({ matricule: req.params.matricule })
      .then( voiture => {
        console.log("wsolt");
        if( req.auth.userId != voiture.ownerID){
          return res.status(401).json({ error: new Error('Requete non autorisée')});
        }
        Voiture.updateOne({ matricule: req.params.matricule }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      })
      .catch( error => res.status(400).json({ message: "voiture untrouvable, " + error.message }))
      }

      exports.deleteVoiture = (req, res, next) => {
        Voiture.findOne({ matricule: req.params.matricule })
        .then( voiture => {
          if( req.auth.userId != voiture.ownerID){
            return res.status(401).json({ error: new Error('Requete non autorisée')});
          }
        Voiture.deleteOne({ matricule: req.params.matricule })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
        })};

      exports.deleteAllVoitures = (req, res, next) => {
        Voiture.deleteMany({})
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };