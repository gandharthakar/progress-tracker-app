import { z } from 'zod';

export const sectionFormValidationSchema = z.object({
    sectionName: z.string({
        required_error: "Please enter Section Name",
        invalid_type_error: "Section Name must be in string format."
    }).min(2, { message: "Section name must be contains at least 2 characters." }),
});

export type sectionFormVS = z.infer<typeof sectionFormValidationSchema>;

export const taskFormValidationSchema = z.object({
    sectionName: z.string({
        required_error: "Please select Section.",
        invalid_type_error: "Section must be in string format."
    }),
    taskTitle: z.string({
        required_error: "Please enter Task Title",
        invalid_type_error: "Task Title must be in string format."
    }).min(2, { message: "Task Title must be contains at least 2 characters." }),
});

export type taskFormVS = z.infer<typeof taskFormValidationSchema>;

export const labelFormValidationSchema = z.object({
    labelTitle: z.string({
        required_error: "Please enter Label Title",
        invalid_type_error: "Label Title must be in string format."
    }).min(2, { message: "Label Title must be contains at least 2 characters." }),
});

export type labelFormVS = z.infer<typeof labelFormValidationSchema>;