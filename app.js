const express = require('express');
const app = express();
const mongoose = require('mongoose');
const voitureRoutes = require('./routes/voiture');
const ownerRoutes = require('./routes/owner');
const clientRoutes = require('./routes/client');
const reservationRoutes = require('./routes/reservation');
const messageRoutes = require('./routes/message');
const cors = require('cors');
// const auth = require('./routes/auth');
const BDUserName = 'Akrem';
const BDPassWord = 'Banlieu13';
const DataBase = 'rentCar';

mongoose.connect('mongodb+srv://' + BDUserName + ':' + BDPassWord + '@rentcar.zwazg.mongodb.net/' + DataBase + '?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée : ',err.message));
  
// app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());
app.use('/api/voiture',voitureRoutes);
app.use('/api/owner',ownerRoutes);
app.use('/api/client',clientRoutes);
app.use('/api/reservation',reservationRoutes);
app.use('/api/message',messageRoutes);
// app.use('/api/auth',auth);

module.exports = app;