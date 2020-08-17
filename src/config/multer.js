const crypto = require('crypto');
const path = require('path');
const multer = require('multer');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);
        const filename = `${hash.toString('hex')}.${file.originalname}`;
        callback(null, filename);
      });
    },
  }),
};
