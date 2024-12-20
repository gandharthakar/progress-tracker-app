import { z } from 'zod';

export const workspaceFormValidationSchema = z.object({
    workspaceName: z.string({
        required_error: "Please enter Workspace Name",
        invalid_type_error: "Workspace Name must be in string format."
    }).min(2, { message: "Workspace name must be contains at least 2 characters." }),
});

export type workspaceFormVS = z.infer<typeof workspaceFormValidationSchema>;