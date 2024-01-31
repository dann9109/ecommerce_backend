const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: 'product_tag',
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: 'product_tag',
  foreignKey: 'tag_id',
});

module.exports = {
  Category,
  Product,
  Tag,
};