const express = require('express');

const urlRoutes = require('./urlRoutes');
const redirectRoutes = require('./redirectRoutes');

const router = express.Router();

router.use('/api/urls', urlRoutes);
router.use('/r', redirectRoutes);

module.exports = router;