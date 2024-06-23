// src/models/Item.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define(
  'Item',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: DataTypes.STRING,
    short_description: DataTypes.TEXT,
    description: DataTypes.TEXT,
    long_description: DataTypes.TEXT,
    remark_notes: DataTypes.TEXT,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Item;
