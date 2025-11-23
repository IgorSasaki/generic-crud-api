import { HttpError } from "../../utils/httpError.js"
import { makeReportRepoSequelize } from "./report.repo.sequelize.js"

export const makeReportService = () => {
  const repo = makeReportRepoSequelize()
  const SORTABLE = ['id', 'title', 'createdAt']
  const DIR_OK = ['ASC', 'DESC']

  const create = async ({ title, content, originLocation, createdBy }) => {
    return await repo.create({ title, content, originLocation, createdBy })
  }

  const get = async ({ id }) => {
    const found = await repo.findById({ id })

    if (!found) {
      throw new HttpError('Report not found', 404, 'NOT_FOUND');
    }

    return found
  }

  const list = async ({ q, page = 1, limit = 10, order = 'createdAt', dir = 'ASC' }) => {
    if (!SORTABLE.includes(order)) order = 'createdAt';
    if (!DIR_OK.includes(String(dir).toUpperCase())) dir = 'ASC';

    return repo.findAll({ q, order, dir, page: Number(page), limit: Number(limit) });
  }

  const update = async ({ id, data }) => {
    const updated = await repo.update({ id, data });

    if (!updated) {
      throw new HttpError('Report not found', 404, 'NOT_FOUND');
    }

    return updated;
  }

  const remove = async ({ id }) => {
    const ok = await repo.delete({ id });

    if (!ok) {
      throw new HttpError('Report not found', 404, 'NOT_FOUND');
    }
  }

  return {
    create,
    get,
    list,
    update,
    remove
  }
}