const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const upload = multer(multerConfig);

const {
  findAll,
  findAllByAuthor,
  remove,
  update,
  find,
  create,
} = require('../controllers/post');

router.get('/posts', findAll);
router.get('/posts/author/:id', findAllByAuthor);
router.delete('/posts/:id', remove);
router.put('/posts/:id', upload.single('image'), update);
router.get('/posts/:id', find);
router.post('/posts', upload.single('image'), create);

module.exports = router;
