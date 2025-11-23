import { makeReportService } from "./report.service.js"

export const makeReportController = () => {
  const service = makeReportService()

  const create = async (request, response, next) => {
    try {
      const { title, content, originLocation } = request.body;

      const product = await service.create({ title, content, originLocation, createdBy: request.user.id });

      return response.status(201).json(product);
    } catch (error) {
      return next(error);
    }
  };

  const list = async (request, response, next) => {
    try {
      const data = await service.list(request.query);
      return response.json(data);
    } catch (err) {
      return next(err);
    }
  };

  const get = async (request, response, next) => {
    try {
      return response.json(await service.get({ id: request.params.id }));
    }
    catch (err) {
      return next(err);
    }
  };

  const patch = async (request, response, next) => {
    try {
      return response.json(await service.update({ id: request.params.id, data: request.body }));
    }
    catch (err) {
      return next(err);
    }
  };

  const remove = async (request, response, next) => {
    try {
      await service.remove({ id: request.params.id });
      return response.status(204).send();
    }
    catch (err) {
      return next(err);
    }
  };

  return {
    create,
    list,
    get,
    patch,
    remove
  }

}