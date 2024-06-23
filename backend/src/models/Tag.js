// src/models/Tag.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tag = sequelize.define(
  'Tag',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Tag;
