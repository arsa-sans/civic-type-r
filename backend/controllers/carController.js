const cars = require('../data/cars.json');

const getAllCars = (req, res) => {
  try {
    const simplifiedCars = cars.map(({ id, name, year, tagline, price, power, acceleration, topSpeed, gallery, color, badge, category }) => ({
      id,
      name,
      year,
      tagline,
      price,
      power,
      acceleration,
      topSpeed,
      image: gallery[0],
      color,
      badge,
      category,
    }));
    res.json({
      success: true,
      count: simplifiedCars.length,
      data: simplifiedCars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * Get car by ID
 * GET /api/cars/:id
 */
const getCarById = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const car = cars.find((c) => c.id === id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: `Car with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllCars,
  getCarById,
};
