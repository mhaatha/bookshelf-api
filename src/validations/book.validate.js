const Joi = require('joi');

const bookshelfSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  year: Joi.number(),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number(),
  readPage: Joi.number(),
  finished: Joi.boolean(),
  reading: Joi.boolean(),
  insertedAt: Joi.date(),
  updatedAt: Joi.date(),
});

const bookshelfQuerySchema = Joi.object({
  name: Joi.string(),
  reading: Joi.string().min(0).max(1),
  finished: Joi.string().min(0).max(1),
});

module.exports = { bookshelfSchema, bookshelfQuerySchema };
