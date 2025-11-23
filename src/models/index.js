import { database } from '../config/database.js';
import { User } from './User.js';

const models = { User };

// Sincronizar modelos (apenas em desenvolvimento!)
if (process.env.NODE_ENV === 'development') {
  database.sync({ alter: true })
    .then(() => console.log('✅ Synchronized models'))
    .catch(error => console.error('❌ Error while synchronizing:', error));
}

export { database, User };
export default models;