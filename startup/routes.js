const express = require('express');
const router = express.Router();

router.use('/dms', require('../controllers/dms'));

module.exports = router;
