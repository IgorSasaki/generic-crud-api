export const validate = (schemas = {}) => (request, _res, next) => {
  try {
    if (schemas.body) request.body = schemas.body.parse(request.body);
    if (schemas.query) request.query = schemas.query.parse(request.query);
    if (schemas.params) request.params = schemas.params.parse(request.params);
    return next();
  } catch (err) {
    const issues = err?.issues?.map(i => ({ path: i.path, message: i.message })) ?? null;
    return next({ message: 'Validation error', status: 400, code: 'BAD_requestUEST', details: issues });
  }
};