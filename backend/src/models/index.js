// src/models/index.js
const Item = require('./Item');
const Tag = require('./Tag');
const ItemTag = require('./ItemTag');
const ItemRelationship = require('./ItemRelationship');
const TagRelationship = require('./TagRelationship');

// Define item-tag relationship
Item.belongsToMany(Tag, { through: ItemTag, foreignKey: 'item_id' });
Tag.belongsToMany(Item, { through: ItemTag, foreignKey: 'tag_id' });

// Define item parent-child relationship
Item.belongsToMany(Item, {
  as: 'Parents',
  through: ItemRelationship,
  foreignKey: 'child_item_id',
});
Item.belongsToMany(Item, {
  as: 'Children',
  through: ItemRelationship,
  foreignKey: 'parent_item_id',
});

// Define tag parent-child relationship
Tag.belongsToMany(Tag, {
  as: 'ParentTags',
  through: TagRelationship,
  foreignKey: 'child_tag_id',
});
Tag.belongsToMany(Tag, {
  as: 'ChildTags',
  through: TagRelationship,
  foreignKey: 'parent_tag_id',
});

module.exports = {
  Item,
  Tag,
  ItemTag,
  ItemRelationship,
  TagRelationship,
};
