const express = require('express');
const router = express.Router();
const signIn = require('../controllers/signIn');
// const multer = require('../middleware/multer-config');

// router.post('/', auth, Client.createClient);
router.post('/',  signIn.auth);


module.exports = router;