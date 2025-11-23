import { Router } from "express"
import { makeReportController } from "../modules/reports/report.controller.js"
import { ensureAuth } from "../middlewares/auth.js"
import { validate } from "../middlewares/validate.js"
import { createReportSchema, listReportsQuery, patchReportSchema, reportIdParams } from "../modules/reports/report.schemas.js"

export const reportRouter = () => {
  const r = Router()
  const ctrl = makeReportController()


  r.post('/', ensureAuth, validate({ body: createReportSchema }), ctrl.create)
  r.get('/', validate({ query: listReportsQuery }), ctrl.list)
  r.get('/:id', validate({ params: reportIdParams }), ctrl.get)
  r.patch('/:id', ensureAuth, validate({ params: reportIdParams, body: patchReportSchema }), ctrl.patch)
  r.delete('/:id', ensureAuth, validate({ params: reportIdParams }), ctrl.remove)

  return r
}