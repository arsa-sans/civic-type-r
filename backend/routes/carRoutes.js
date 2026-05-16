const express = require('express');
const router = express.Router();
const { getAllCars, getCarById } = require('../controllers/carController');

// GET /api/cars - Get all cars
router.get('/', getAllCars);

// GET /api/cars/:id - Get car by ID  
router.get('/:id', getCarById);

module.exports = router;
