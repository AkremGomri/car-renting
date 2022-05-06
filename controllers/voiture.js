const Voiture = require('../models/voiture');
const Reservation = require('../models/reservation');
const Owner = require('../models/owner');


exports.createVoiture = (req, res, next) => {

    const voiture = new Voiture({
      ...req.body,
      ownerID: req.auth.userId
    });
    console.log(voiture);
    voiture.save()
      .then(() => res.status(201).json({ message: 'Objet enregistréeeee !'}))
      .catch(error => {
        console.log("eroooor ",error);
        res.status(400).json({ error })});

      Owner.findById( req.auth.userId )
      .then(owner => {
        if(owner === null){
          console.log("utilis non trouvé ");
          return res.status(400).json({ message: "owner non trouvée " })
        }
        owner.voitures.push(voiture._id)
        owner.save()
      })
      .catch(error => console.log(error));

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

      exports.availableCarsByDate = async(req, res, next) => {
        var dateDep = new Date(req.params.DateMin);
        var dateRet = new Date(req.params.DateMax);

        const secDep = dateDep.setHours(dateDep.getHours() - 1 );
        dateDep = new Date(secDep).toLocaleString('en-US',{timeZone:'UTC'});

        const secRet = dateRet.setHours(dateRet.getHours() + 1 );
        dateRet = new Date(secRet).toLocaleString('en-US',{timeZone:'UTC'});

        var reservations = await Reservation.find({ DasteMin: {$gte: dateDep, $lte: dateRet} })
        var reservations1 = await Reservation.find({ DateMax: {$gte: dateDep, $lte: dateRet} })

        reservations = reservations.concat(reservations1);
        

        var allCars = [];
 
        reservations.map((reservation) => {
          allCars.push(reservation.idVoiture)
        })
        allCars = allCars.toString().split(',')
        Voiture.find()
          .then( voitures => {
            var v = voitures.filter((voiture) => {
              return !allCars.includes(voiture._id.toString()); 
            })
            res.status(200).json(v)
          }).catch(err => {
            res.status(400).json({ err })
          })
      };
  
    