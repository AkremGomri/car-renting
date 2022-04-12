const express = require('express');
const router = express.Router();
const Voiture = require('../controllers/voiture')
const auth = require('../middleware/auth')
// const multer = require('../middleware/multer-config');

router.post('/', Voiture.createVoiture);
router.get('/', Voiture.getAllVoitures);
router.get('/:matricule', Voiture.getOneVoiture);
router.put('/:matricule',auth, Voiture.modifyVoiture);
router.delete('/:matricule', Voiture.deleteVoiture);
router.delete('/', Voiture.deleteAllVoitures);

module.exports = router;