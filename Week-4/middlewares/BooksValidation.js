const Joi = require('joi');

const validate = (req, res, next) => {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    author: Joi.string().min(4).max(50).required(),
    category: Joi.string().min(2).max(50).required(),
    publicationYear: Joi.number().min(1000).max(9999).required(),
  };
  const validationRes = Joi.object(schema).validate(req.body);
  const { error } = validationRes;
  if (error) {
    res.status(404).send(error?.details);
  } else {
    next();
  }
};

module.exports = validate;