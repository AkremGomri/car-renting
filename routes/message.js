const express = require('express');
const router = express.Router();
const Message = require('../controllers/message')
const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');

// router.post('/', auth, Client.createClient);
router.post('/postmessage', Message.createMessageUnknownUser);
router.post('/', auth, Message.createMessage);
router.get('/',  Message.getAllMessages);
router.get('/:id', Message.getMessagesByOwnerId, Message.getMessagesByClientId);
// router.get('/:id', Client.getOneClient);
// router.put('/:id', auth, Client.modifyClient);
// router.delete('/:id', auth, Client.deleteClient);
// router.delete('/', Client.deleteAllClients);

module.exports = router;