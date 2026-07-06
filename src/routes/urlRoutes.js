const express = require('express');

const urlController = require('../controllers/urlController');
const { validateCreateUrl } = require('../middlewares/validators');

const router = express.Router();

router.post('/', validateCreateUrl, urlController.createShortUrl);
router.get('/', urlController.getAllUrls);
router.get('/:code', urlController.getUrlByCode);
router.delete('/:code', urlController.deleteUrlByCode);

module.exports = router;