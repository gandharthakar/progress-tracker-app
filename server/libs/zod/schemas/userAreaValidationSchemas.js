const { z } = require('zod');

const userRegisterFormValidationSchema = z.object({
    fullName: z.string({
        required_error: "Please enter Full Name",
        invalid_type_error: "Full Name must be in string format."
    }).min(6, { message: "Full name must be contains at least 6 characters." }),

    email: z.string({
        required_error: "Please enter email address.",
        invalid_type_error: "Email must be in string format."
    }).email({
        message: "Please enter valid email address."
    }).min(1),

    password: z.string({
        invalid_type_error: "Password must be in string format."
    }).min(8).max(16),

    confirmPassword: z.string({
        invalid_type_error: "Confirm password must be in string format."
    }).min(8).max(16)
});

const userLoginFormValidationSchema = z.object({
    email: z.string({
        required_error: "Please enter email address.",
        invalid_type_error: "Email must be in string format."
    }).email({
        message: "Please enter valid email address."
    }).min(1),

    password: z.string({
        invalid_type_error: "Password must be in string format."
    }).min(8).max(16),
});

const userForgotPasswordFormValidationSchema = z.object({
    email: z.string({
        required_error: "Please enter email address.",
        invalid_type_error: "Email must be in string format."
    }).email({
        message: "Please enter valid email address."
    }).min(1),
});

const userResetPasswordFormValidationSchema = z.object({
    password: z.string({
        invalid_type_error: "Password must be in string format."
    }).min(8).max(16),

    confirmPassword: z.string({
        invalid_type_error: "Confirm password must be in string format."
    }).min(8).max(16)
});

const updateUserGeneralSettingsFormValidationSchema = z.object({
    fullName: z.string({
        required_error: "Please enter Full Name",
        invalid_type_error: "Full Name must be in string format."
    }).min(6, { message: "Full name must be contains at least 6 characters." }),

    email: z.string({
        required_error: "Please enter email address.",
        invalid_type_error: "Email must be in string format."
    }).email({
        message: "Please enter valid email address."
    }).min(1),
});

const emlverlnkreqFormValidationSchema = z.object({
    email: z.string({
        required_error: "Please enter email address.",
        invalid_type_error: "Email must be in string format."
    }).email({
        message: "Please enter valid email address."
    }).min(1),
});

module.exports = {
    userRegisterFormValidationSchema,
    userLoginFormValidationSchema,
    userForgotPasswordFormValidationSchema,
    userResetPasswordFormValidationSchema,
    updateUserGeneralSettingsFormValidationSchema,
    emlverlnkreqFormValidationSchema
}