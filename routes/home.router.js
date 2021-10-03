const express = require('express');
const Router = express.Router();

const Controller = require('../controllers/home.controller')

const auth = require('./auth/auth.js')

Router.get('/me', auth, Controller.me)
Router.get('/', Controller.main)

module.exports = Router;