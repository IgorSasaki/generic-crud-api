import { z } from "zod";

export const createReportSchema = z.object({
  title: z.string().min(1, 'title is required'),
  content: z.string().min(1, 'content is required'),
  originLocation: z.string().min(1, 'originLocation is required'),
})

export const listReportsQuery = z.object({
  q: z.string().optional(),
  order: z.enum(['id', 'title', 'createdAt']).optional(),
  dir: z.enum(['ASC', 'DESC']).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional()
})

export const reportIdParams = z.object({
  id: z.coerce.string()
});

export const patchReportSchema = z.object({
  title: z.string().min(1, 'title is required'),
  content: z.string().min(1, 'content is required'),
  originLocation: z.string().min(1, 'originLocation is required'),
}).refine(obj => Object.keys(obj).length > 0, {
  message: 'no fields to update'
});