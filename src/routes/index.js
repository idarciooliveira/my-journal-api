const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ message: 'OK' });
});

module.exports = router;
