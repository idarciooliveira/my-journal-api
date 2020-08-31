const router = require('express').Router();
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const {
  findAll,
  remove,
  update,
  find,
  create,
} = require('../controllers/category');

router.get('/categories', authMiddleware, findAll);
router.get('/categories/:id', authMiddleware, find);
router.delete('/categories/:id', authMiddleware, remove);
router.post('/categories', authMiddleware, create);
router.put('/categories/:id', authMiddleware, update);

module.exports = router;
