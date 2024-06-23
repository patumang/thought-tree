// src/controllers/tagController.js
const { Tag, TagRelationship } = require('../models');

exports.getAllTags = async (req, res) => {
  const tags = await Tag.findAll();
  res.json(tags);
};

exports.getTagById = async (req, res) => {
  const tag = await Tag.findByPk(req.params.id);
  res.json(tag);
};

exports.getTagParents = async (req, res) => {
  const parents = await TagRelationship.findAll({
    where: { child_tag_id: req.params.id },
    include: [{ model: Tag, as: 'ParentTags' }],
  });
  res.json(parents);
};

exports.getTagChildren = async (req, res) => {
  const children = await TagRelationship.findAll({
    where: { parent_tag_id: req.params.id },
    include: [{ model: Tag, as: 'ChildTags' }],
  });
  res.json(children);
};

exports.createTag = async (req, res) => {
  const newTag = await Tag.create(req.body);
  res.json(newTag);
};

exports.updateTag = async (req, res) => {
  const updatedTag = await Tag.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedTag);
};
