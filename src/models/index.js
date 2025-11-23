import { database } from '../config/database.js';
import { Report } from './Report.js';
import { User } from './User.js';

const models = { User, Report };

User.hasMany(Report, {
  foreignKey: 'createdBy',
  as: 'reports'
})

Report.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'user'
})

// Syncronized models (only in development)
if (process.env.NODE_ENV === 'development') {
  database.sync({ alter: true })
    .then(() => console.log('✅ Synchronized models'))
    .catch(error => console.error('❌ Error while synchronizing:', error));
}

export { database, User, Report };
export default models;