const express = require('express');
const { AddAddress, GetAddress, UpdateAddress, RemoveAddress } = require('../controller/addressController');
const auth = require('../utils/authMiddleware');


const AddressRouter = express.Router();


AddressRouter.post('/add',auth ,AddAddress);
AddressRouter.get('/get', GetAddress);
AddressRouter.put('/update/:id', UpdateAddress);
AddressRouter.delete('/remove/:id', RemoveAddress);

module.exports = AddressRouter;