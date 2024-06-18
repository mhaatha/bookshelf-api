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

module.exports = { bookshelfSchema };
