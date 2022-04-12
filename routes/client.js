const express = require('express');
const router = express.Router();
const Client = require('../controllers/client')
const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

// router.post('/', auth, Client.createClient);
router.post('/signUp',  Client.signUp);
router.post('/signIn',  Client.signIn);
router.get('/', Client.getAllClient);
router.get('/:id', Client.getOneClient);
router.put('/:id', auth, Client.modifyClient);
router.delete('/:id', auth, Client.deleteClient);
router.delete('/', Client.deleteAllClients);

module.exports = router;