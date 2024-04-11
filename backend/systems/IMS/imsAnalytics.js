const express = require('express');
const Item = require('../../model/Item');
const Medicine = require('../../model/Medicine');
const Material = require('../../model/Material');
const Accessory = require('../../model/Accessory');
const MedicineLot = require('../../model/MedicineLot');
const MedicineRequest = require('../../model/MedicineRequest');
const MaterialRequest = require('../../model/MaterialRequest');

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
