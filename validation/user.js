const Joi = require("@hapi/joi")

// Create User Validation
const createValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        gender: Joi.string().min(4).required()
    });
    return schema.validate(data);
}

const updateValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).optional(),
        gender: Joi.string().min(4).optional()
    });
    return schema.validate(data);
}

module.exports = { createValidation, updateValidation }