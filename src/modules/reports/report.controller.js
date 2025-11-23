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

  const get = async (req, res, next) => {
    try {
      return res.json(await service.get(req.params.id));
    }
    catch (err) {
      return next(err);
    }
  };

  const patch = async (req, res, next) => {
    try {
      return res.json(await service.patch(req.params.id, req.body));
    }
    catch (err) {
      return next(err);
    }
  };

  const remove = async (req, res, next) => {
    try {
      await service.remove(req.params.id);
      return res.status(204).send();
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