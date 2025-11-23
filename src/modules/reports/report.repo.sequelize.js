import { Op } from "sequelize"
import { Report } from "../../models/Report.js"
import { User } from "../../models/User.js"

export const makeReportRepoSequelize = () => {
  return {
    async create({ title, content, originLocation, createdBy }) {
      const report = await Report.create({ title, content, originLocation, createdBy })

      return report.toJSON()
    },

    async findById({ id }) {
      const report = await Report.findByPk(id)

      return report ? report.toJSON() : null
    },

    async findAll({ q, page = 1, limit = 10, order = 'id', dir = 'ASC' }) {
      const where = {}

      // Filtro por nome (busca parcial)
      if (q) {
        where.name = { [Op.like]: `%${q}%` };  // SQLite
        // where.name = { [Op.iLike]: `%${q}%` };  // PostgreSQL (case-insensitive)
      }

      const offset = (page - 1) * limit;

      const { count, rows } = await Report.findAndCountAll({
        where,
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }],
        limit,
        offset,
        order: [[order, dir]]
      });

      return {
        items: rows.map(p => p.toJSON()),
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      };
    },

    async update({ id, data }) {
      const report = await Report.findByPk(id)
      if (!report) return null

      await report.update(data)
      return report.toJSON()
    },

    async delete({ id }) {
      const report = await Report.findByPk(id)
      if (!report) return false

      await report.destroy()
      return true
    }
  }
}