const express = require('express');
const router = express.Router();

// Earthquakes
module.exports = router.get('/earthquakes', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(require('../../data/earthquakes-2015.json'), null, 3));
});

// Climate
module.exports = router.get('/climate', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(require('../../data/climate.json'), null, 3));
});

// Crime Mapping
module.exports = router.get('/crime-mapping', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(require('../../data/crime-mapping.json'), null, 3));
});
