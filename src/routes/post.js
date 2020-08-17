const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const upload = multer(multerConfig);
const authMiddleware = require('../middleware/auth');
const {
  findAll,
  findAllByAuthor,
  remove,
  update,
  find,
  create,
} = require('../controllers/post');

router.get('/posts', authMiddleware, findAll);
router.get('/posts/author/:id', authMiddleware, findAllByAuthor);
router.delete('/posts/:id', authMiddleware, remove);
router.put('/posts/:id', authMiddleware, upload.single('image'), update);
router.get('/posts/:id', authMiddleware, find);
router.post('/posts', authMiddleware, upload.single('image'), create);

module.exports = router;
