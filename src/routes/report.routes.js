import { Router } from "express"
import { makeReportController } from "../modules/reports/report.controller.js"
import { ensureAuth } from "../middlewares/auth.js"
import { validate } from "../middlewares/validate.js"
import { createReportSchema, listReportsQuery, patchReportSchema, reportIdParams } from "../modules/reports/report.schemas"

export const reportRouter = () => {
  const r = Router()
  const ctrl = makeReportController()

  r.use(ensureAuth)

  r.post('/', validate({ body: createReportSchema }), ctrl.create)
  r.get('/', validate({ query: listReportsQuery }), ctrl.list)
  r.get('/:id', validate({ params: reportIdParams }), ctrl.get)
  r.patch('/:id', validate({ params: reportIdParams, body: patchReportSchema }), ctrl.patch)
  r.delete('/:id', validate({ params: reportIdParams }), ctrl.remove)

  return r
}