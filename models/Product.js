const router = require('express').Router();
const { Product, Category, Tag } = require('.');

// GET all products
router.get('/', async (req, res) => {
  try {
    const productsData = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: 'ProductTag' },
      ],
    });
    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a single product by id
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: 'ProductTag' },
      ],
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT update a product by id
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updatedProduct[0]) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a product by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!deletedProduct) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
