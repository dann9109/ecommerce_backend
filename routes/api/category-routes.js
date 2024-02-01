const router = require('express').Router();
const { Category, Product } = require('../../../models');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a single category by id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT update a category by id
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a category by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;