import { DataTypes } from "sequelize";
import { database } from "../config/database.js";

export const Report = database.define('Report', {
  id: {
    type: DataTypes.UUID, // Mude para UUID
    defaultValue: DataTypes.UUIDV4, // Adicione o gerador de UUID v4
    primaryKey: true,
    allowNull: false, // Garante que não será nulo
    unique: true // Garante a unicidade (primaryKey já implica isso, mas é bom ser explícito)
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  originLocation: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'origin_location'
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'created_by',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'reports',
  timestamps: true,      // Adiciona createdAt e updatedAt
  underscored: true      // Usa snake_case no banco (created_at)
})