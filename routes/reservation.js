const express = require('express');
const router = express.Router();
const Reservation = require('../controllers/reservation')

router.post('/', Reservation.createReservation);
router.get('/', Reservation.getAllReservations);
router.get('/:id', Reservation.getOneReservation);
router.put('/:id', Reservation.modifyReservation);
router.delete('/:id', Reservation.deleteReservation);
router.delete('/', Reservation.deleteAllReservations);

router.get('/voiture/:id', Reservation.getManyReservations);
// router.get('/voiture/:id/:id2', Reservation.getManyReservationsByvoitureAndDate);

module.exports = router;