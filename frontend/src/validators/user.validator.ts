import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).required().messages({
        "string.pattern.base":
            "Email address must be in a valid format (Example: user@example.com)",
        "string.empty": "Email cannot be an empty field",
        "any.required": "Email is a required field",
    }),
    password: Joi.string().min(5).required().messages({
        "any.required": "Password is a required field",
        "string.empty": "Password should not be empty",
        "string.min": `Password should have a minimum length of {#limit} characters`,
    })
});
