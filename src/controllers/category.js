const categoryModel = require('../models/category');
const categoryController = {};

categoryController.create = async (req, res) => {
  try {
    const { description } = req.body;

    if (await categoryModel.findOne({ description })) {
      return res.status(400).send({ message: 'Category already exist' });
    }

    const category = new categoryModel({
      description,
    });

    await category.save();

    return await res.json(category);
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

categoryController.findAll = async (req, res) => {
  try {
    const categories = await categoryModel.find().lean();
    return await res.json({ categories });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

categoryController.find = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id).lean();
    return await res.json({ category });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

categoryController.update = async (req, res) => {
  try {
    if (!(await categoryModel.findById(req.params.id))) {
      return res.status(404).send({ message: 'Category not found' });
    }

    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!category)
      return res.status(400).send({ message: 'Cannot update the Category' });

    return res.send({ category });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

categoryController.remove = async (req, res) => {
  try {
    await categoryModel
      .findByIdAndRemove(req.params.id)
      .then(() => {
        return res.send();
      })
      .catch((error) => {
        return res.status(400).send({ message: `Cannot delete  ${error}` });
      });
  } catch (error) {
    res.status(400).send({ message: `Error ${error}` });
  }
};

module.exports = categoryController;
