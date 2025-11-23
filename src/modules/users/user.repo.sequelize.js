import { User } from '../../models/index.js';

export const makeUserRepoSequelize = () => {
  return {
    async create({ name, email, passwordHash }) {
      const user = await User.create({ name, email, passwordHash });

      return user.toJSON();
    },

    async findByEmail({ email }) {
      const user = await User.findOne({ where: { email } });

      return user ? user.toJSON() : null;
    },

    async findById({ id }) {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['passwordHash'] }  // Não retornar senha
      });

      return user ? user.toJSON() : null;
    },

    async update({ id, data }) {
      const user = await User.findByPk(id);
      if (!user) return null;

      await user.update(data);
      return user.toJSON();
    },

    async delete({ id }) {
      const user = await User.findByPk(id);
      if (!user) return false;

      await user.destroy();
      return true;
    }
  };
}