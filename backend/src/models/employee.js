const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    organisation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "organisations",
        key: "id",
      },
    },
    first_name: {
      type: DataTypes.STRING(100),
    },
    last_name: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(255),
    },
    phone: {
      type: DataTypes.STRING(50),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "employees",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["organisation_id", "email"],
      },
      {
        unique: true,
        fields: ["organisation_id", "phone"],
      },
    ],
  }
);

module.exports = Employee;
