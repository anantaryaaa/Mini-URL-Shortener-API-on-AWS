const express = require('express');

const urlController = require('../controllers/urlController');

const router = express.Router();

router.get('/:code', urlController.redirectToOriginalUrl);

module.exports = router;