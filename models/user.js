import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js'; 

const User = sequelize.define(
  'User',
  {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'users', 
  }
);

export default User;
