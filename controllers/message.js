const Owner = require('../models/owner');
const Client = require('../models/client');
const Message = require('../models/message');

exports.getAllMessages = (req, res, next) => {
  Message.find()
    .then(message => {res.status(200).json(message)})
    .catch(error => res.status(400).json({ error }));
};

exports.getMessagesByOwnerId = async (req, res, next) => {
  const owner = await Owner.findById( req.params.Id )
  if(owner){
    console.log(owner._id);
    Message.find({
      userId: owner._id
    })
      .then(message => {res.status(200).json(message)})
      .catch(error => res.status(400).json({ error }));
    } else {
    console.log("owner doesn't exist: ",owner);
    next();
  }
};

exports.getMessagesByClientId = async (req, res, next) => {
  const client = await Client.findById( req.params.Id )
  console.log(client._id);s
  Message.find({
    userId: client._id
  })
    .then(message => {res.status(200).json(message)})
    .catch(error => res.status(400).json({ error }));
};

exports.createMessage = async (req, res, next) => {
  const clientDoesExits = await Client.exists({ _id: req.auth.userId });
  const ownerDoesExits = await Owner.exists({ _id: req.auth.userId });

  var message;
  if( clientDoesExits ) {
    message = createMessageSquelette('Client', req);
  } else if( ownerDoesExits ) {
    message = createMessageSquelette('Owner', req);
  } else {
    res.status(400).json({ message: "user does not exist... which is a weird case, supposed to be already authentified ! " })
  }

  message.save()
  .then(() => res.status(201).json({ message: 'Message enregistré !'}))
  .catch(error => res.status(400).json({ error }));
}

exports.createMessageUnknownUser = (req, res, next) => {
  var message = new Message({
    message: req.body.message,
    email: req.body.email,
    nom: req.body.nom,
    prenom: req.body.prenom,
    date: Date(Date.now())
  });
  message.save()
  .then(() => res.status(201).json({ message: 'Message enregistré !'}))
  .catch(error => res.status(400).json({ error }));
  
}

function createMessageSquelette( userType ,req ){
  console.log("createMessageSqulette: userType ",userType, " userId ", req.auth.userId);
  var message = new Message({
    userType,
    userId: req.auth.userId,
    message: req.body.message,
    date: Date(Date.now())
  });
  return message;
}