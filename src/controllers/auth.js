const userModel = require('../models/user');
const authorModel = require('../models/author');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {};

authController.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (await userModel.findOne({ username })) {
      return res.status(400).send({ message: 'Username already exist' });
    }

    const user = new userModel({
      username,
      password,
    });

    await user.save();

    const author = new authorModel({
      ...req.body,
      userId: user._id,
    });

    await author.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: '24h',
    });

    return await res.json({
      user,
      author,
      token,
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: `Cannot register a user because ${error}` });
  }
};

authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username }).select('+password');

    if (!user) return res.status(400).send({ message: 'Username dont exist' });

    if (!(await bcrypt.compare(password, user.password)))
      return res
        .status(400)
        .send({ message: 'Username or Password incorrect' });

    const author = await authorModel.findOne({ userId: user._id });

    if (!author) {
      return res.status(404).send({ message: 'Author not found' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: '24h',
    });

    return await res.json({ author, token });
  } catch (error) {
    res.status(400).send({ message: `Cannot login because ${error}` });
  }
};

module.exports = authController;
