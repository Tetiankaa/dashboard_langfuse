import Joi from "joi";

export class UserValidator {
    private static password = Joi.string()
        .min(5)
        .messages({
            "any.required": "{#label} is a required field",
            "string.empty": "{#label} should not be empty",
            "string.min": `{#label} should have a minimum length of {#limit} characters`,
        });

    private static email = Joi.string()
        .pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
        .messages({
            "string.pattern.base":
                "{#label} address must be in a valid format (Example: user@example.com)",
            "string.empty": "{#label} cannot be an empty field",
            "any.required": "{#label} is a required field",
        });

    public static login = Joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}
