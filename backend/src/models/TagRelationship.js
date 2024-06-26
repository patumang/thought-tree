// src/models/TagRelationship.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tag = require('./Tag');

const TagRelationship = sequelize.define(
  'TagRelationship',
  {
    parent_tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id',
      },
    },
    child_tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = TagRelationship;
