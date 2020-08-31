const postModel = require('../models/post');
const path = require('path');
const fs = require('fs');
const postController = {};

postController.index = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .select('title publicationDate image category')
      .lean();
    return await res.json({ posts });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

postController.create = async (req, res) => {
  try {
    const post = new postModel({
      ...req.body,
      image: req.file.filename,
    });

    await post.save();

    return await res.json({ post });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

postController.findAll = async (req, res) => {
  try {
    const posts = await postModel.find().populate('authorId').lean();
    return await res.json({ posts });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

postController.findAllByAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await postModel
      .find({ authorId: id })
      .populate('authorId')
      .lean();
    return await res.json({ posts });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

postController.remove = async (req, res) => {
  try {
    await postModel
      .findByIdAndRemove(req.params.id)
      .then((removedPost) => {
        fs.unlinkSync(
          path.resolve(__dirname, '..', '..', 'uploads', removedPost.image)
        );
        return res.send();
      })
      .catch((error) => {
        return res
          .status(400)
          .send({ message: `Cannot delete the file ${error}` });
      });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

postController.update = async (req, res) => {
  try {
    if (!(await postModel.findById(req.params.id))) {
      return res.status(404).send({ message: 'Post not found' });
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: req.file.filename },
      { new: true }
    );

    if (!updatedPost)
      return res.status(400).send({ message: 'Cannot update the post' });

    return res.send({ updatedPost });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

postController.find = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id).populate('authorId').lean();
    return await res.json({ post });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

module.exports = postController;
