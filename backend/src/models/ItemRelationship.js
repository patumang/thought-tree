// src/models/ItemRelationship.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Item = require('./Item');

const ItemRelationship = sequelize.define(
  'ItemRelationship',
  {
    parent_item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Item,
        key: 'id',
      },
    },
    child_item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Item,
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

module.exports = ItemRelationship;
