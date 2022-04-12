const Joi = require('@hapi/Joi')

const clientSignUp = Joi.object({
    pseudo: Joi.string().alphanum().min(4).max(10).trim(true).required(),
    motDePasse: Joi.string().alphanum().min(6).max(10).required(),
    Email: Joi.string().email().lowercase().trim(true).trim(true).required(),
    nom: Joi.string().min(3).max(20).trim(true).required(),
    prenom: Joi.string().min(3).max(10).trim(true).required(),
    telephone: Joi.string().min(8).max(12).trim(true).pattern(/^[0-9]+$/).required(),
    CIN: Joi.number().positive().integer().min(1).max(999999999).required(),
    date_de_naissance: Joi.date().required()
  });

  const ownerSignUp = Joi.object({
    pseudo: Joi.string().alphanum().min(4).max(10).trim(true).required(),
    entrepriseName: Joi.string().min(4).trim(true).required(),
    motDePasse: Joi.string().alphanum().min(6).max(10).required(),
    Email: Joi.string().email().lowercase().trim(true).trim(true).required(),
    nom: Joi.string().min(3).max(20).trim(true).required(),
    prenom: Joi.string().min(3).max(10).trim(true).required(),
    addresse: Joi.string().min(4).trim(true).required(),
    telephone: Joi.string().min(8).max(12).trim(true).pattern(/^[0-9]+$/).required(),
    CIN: Joi.number().positive().integer().min(1).max(999999999).required(),
    date_de_naissance: Joi.date().required()
  });

  const clientSignIn = Joi.object({
    pseudo: Joi.string().alphanum().min(4).max(10).trim(true).required(),
    motDePasse: Joi.string().alphanum().min(6).max(10).required()
  });


  module.exports = {
    clientSignUp,
    clientSignIn,
    ownerSignUp
  }