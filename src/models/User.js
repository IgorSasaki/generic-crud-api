import { DataTypes } from 'sequelize';
import { database } from '../config/database.js';

export const User = database.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,

  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      msg: 'Email already exists'
    },
    validate: {
      isEmail: {
        msg: 'Invalid email'
      }
    }
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'password_hash'  // Nome da coluna no banco (snake_case)
  }
}, {
  tableName: 'users',
  timestamps: true,      // Adiciona createdAt e updatedAt
  underscored: true      // Usa snake_case no banco (created_at)
});
