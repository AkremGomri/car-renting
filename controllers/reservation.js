const Reservation = require('../models/reservation');
const Client = require('../models/client');
const Owner = require('../models/owner');
const bcrypt = require('bcrypt');

exports.createReservation = async(req, res, next) => {
    delete req.body._id;
    /***************************  ***************************/
    console.log("userId: ",req.auth.userId);
    const client = await Client.findById(req.auth.userId)
    const owner = await Owner.findById(req.auth.userId)

      const mot_de_passe = (!client && !owner)? console.log('Utilisateur non trouvé !') : !client? owner.motDePasse : client.motDePasse
      const valid = await bcrypt.compare(req.body.motDePasse, mot_de_passe)
          if (!valid) {
            console.log('Mot de passe incorrect !');
            return res.status(401).json({ error: 'Mot de passe incorrect !', code: 001 });
          }
      //   .catch(error => {
      //     console.log('ereuuuuur !', error);
      //     res.status(500).json({ error: "mot de passe n'est pas saisie", code: 001 })
      // });
      /***************************  ***************************/
    const DateMin = new Date(req.body.dateDep);
    const DateMax = new Date( req.body.dateRet);

    var reservation = new Reservation({
      ...req.body,
      idVoiture: req.body.idVoiture,
      DateMin,
      DateMax,
      idClient: req.auth.userId
    });
    reservation.save()
      .then(() => {
        console.log("done");
        res.status(201).json({ message: 'Objet enregistréeeee !'})
    })
      .catch(error => {
        console.log(error);
        var err = error.message.split(' ')[11];
        // err = err.substring(0, err.length-1);
        error = (err === "idClient")? "reservation allready taken" : error;
        res.status(400).json({ message: error, err })});
  };



  exports.getAllReservations = (req, res, next) => {
    Reservation.find()
      .then(reservation => {res.status(200).json(reservation)})
      .catch(error => res.status(400).json({ error }));
  };

    exports.getOneReservation = (req, res) => {
      Reservation.findById(req.params.id)
      .populate("idVoiture")
      .populate('idClient')
      .exec((err,reservation) => {
        const nb_heure = (reservation.DateMax - reservation.DateMin)/(3600*1000);
        const prix_par_heure = reservation.idVoiture.prix_par_heure ;
        const prix_totale = nb_heure * prix_par_heure;
        
          res.status(200).json({reservation, prixTotale: prix_totale});
        })
    };
    
    exports.modifyReservation = (req, res, next) => {
        Reservation.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié !'}))
          .catch(error => res.status(400).json({ error }));
      }

      exports.deleteReservation = (req, res, next) => {
        Reservation.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };

      exports.deleteAllReservation = (req, res, next) => {
        Reservation.collection.deleteMany({});
        Reservation.deleteMany({})
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };

      exports.deleteAllReservations = (req, res, next) => {
        Reservation.deleteMany({})
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      };


      exports.getManyReservations = (req, res, next) => {
        Reservation.find({ idVoiture: req.params.id })
          .then(reservation => res.status(200).json(reservation))
          .catch(error => res.status(404).json({ error }));
      };

    //   exports.getManyReservationsByvoitureAndDate = (req, res, next) => {
    //     Reservation.find({ idVoiture: req.params.id, idClient: req.params.id2})
    //       .then(reservation => res.status(200).json(reservation))
    //       .catch(error => res.status(404).json({ error }));
    //   };

          