import { z } from 'zod';

export const userRegisterFormValidationSchema = z.object({
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

}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Your password didn't match."
});

export type userRegisterFormVS = z.infer<typeof userRegisterFormValidationSchema>;

export const userLoginFormValidationSchema = z.object({
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

export type userLoginFormVS = z.infer<typeof userLoginFormValidationSchema>;

export const userForgotPasswordFormValidationSchema = z.object({
    email: z.string({
        required_error: "Please enter email address.",
        invalid_type_error: "Email must be in string format."
    }).email({
        message: "Please enter valid email address."
    }).min(1),
});

export type userForgotPasswordFormVS = z.infer<typeof userForgotPasswordFormValidationSchema>;

export const userResetPasswordFormValidationSchema = z.object({
    password: z.string({
        invalid_type_error: "Password must be in string format."
    }).min(8).max(16),

    confirmPassword: z.string({
        invalid_type_error: "Confirm password must be in string format."
    }).min(8).max(16)

}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Your password didn't match."
});

export type userResetPasswordFormVS = z.infer<typeof userResetPasswordFormValidationSchema>;

export const updateUserGeneralSettingsFormValidationSchema = z.object({
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

export type updateUserGeneralSettingsFormVS = z.infer<typeof updateUserGeneralSettingsFormValidationSchema>;