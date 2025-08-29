const express = require('express');
const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    res.send({ message: 'Hello world!' });
  } catch (error) {}
});

module.exports = router;
