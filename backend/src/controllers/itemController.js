// src/controllers/itemController.js
const { Item, ItemRelationship, ItemTag, Tag } = require('../models');

exports.getAllItems = async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  res.json(item);
};

exports.getItemParents = async (req, res) => {
  const parents = await ItemRelationship.findAll({
    where: { child_item_id: req.params.id },
    include: [{ model: Item, as: 'Parents' }],
  });
  res.json(parents);
};

exports.getItemChildren = async (req, res) => {
  const children = await ItemRelationship.findAll({
    where: { parent_item_id: req.params.id },
    include: [{ model: Item, as: 'Children' }],
  });
  res.json(children);
};

exports.getItemPathsToRoot = async (req, res) => {
  // Implementation for paths to root (recursive pathfinding)
};

exports.createItem = async (req, res) => {
  const newItem = await Item.create(req.body);
  res.json(newItem);
};

exports.updateItem = async (req, res) => {
  const updatedItem = await Item.update(req.body, {
    where: { id: req.params.id },
  });
  /* const upateItemRelationship = await ItemRelationship.findOrCreate({
    where: {
      parent_item_id: req.params.id,
      child_item_id: req.body.parents[0],
    },
  }); */
  res.json(updatedItem);
};
