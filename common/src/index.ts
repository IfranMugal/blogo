import {z} from "zod";

// these validations will be required by the backend

export const signupZod = z.object({
    email: z.string().email("Please enter a valid email address."),
    name: z.string().min(6, "Name must be at least 6 characters long."),
    password: z.string(),
});
export const signinZod = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string(),
});
export const createblogZod = z.object({
    title: z.string(),
    content: z.string()
});
export const updateblogZod = z.object({
    title: z.string(),
    content: z.string(),
    id : z.string()
});

// these types will be reqired by the frontend

export type signupInput = z.infer<typeof signupZod>;
export type signinInput = z.infer<typeof signinZod>;
export type createblogInput = z.infer<typeof createblogZod>;
export type updateblogInput = z.infer<typeof updateblogZod>;