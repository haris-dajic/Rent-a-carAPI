const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Haris Dajic');
});

module.exports = router;