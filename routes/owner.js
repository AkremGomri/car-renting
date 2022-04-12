const express = require('express');
const router = express.Router();
const Owner = require('../controllers/owner')
const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

// router.post('/', Owner.createOwner);
router.post('/signUp', Owner.signUp);
router.post('/signIn', Owner.signIn);
// router.get('/mesVoitures/:id' , Owner.getMesVoitures);
router.get('/myVoitures/:id' , Owner.getMyCars);
router.get('/' , Owner.getAllOwner);
router.get('/:id' , auth, Owner.getOneOwner);
router.put('/:id',auth ,Owner.modifyOwner);
router.delete('/:id',auth , Owner.deleteOwner);
router.delete('/', Owner.deleteAllOwner);

module.exports = router;