// src/models/ItemTag.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Item = require('./Item');
const Tag = require('./Tag');

const ItemTag = sequelize.define(
  'ItemTag',
  {
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Item,
        key: 'id',
      },
    },
    tag_id: {
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

module.exports = ItemTag;
