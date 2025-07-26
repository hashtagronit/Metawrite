import z from "zod";

export const signupInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(1, "Password is required"),
});

export const signinInputSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const createBlogInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const updateBlogInputSchema = z.object({
  id: z.string().uuid("Invalid blog ID"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const paginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => Number(val || "1")),
  limit: z
    .string()
    .optional()
    .transform((val) => Number(val || "10")),
});

export const blogIdParamSchema = z.object({
  id: z.string().uuid("Invalid blog ID"),
});


export type SignupInputSchema = z.infer<typeof signupInputSchema>;
export type SigninInputSchema = z.infer<typeof signinInputSchema>;
export type CreateBlogInputSchema = z.infer<typeof createBlogInputSchema>;
export type UpdateBlogInputSchema = z.infer<typeof updateBlogInputSchema>;
export type PaginationQuerySchema = z.infer<typeof paginationQuerySchema>;
export type BlogIdParamSchema = z.infer<typeof blogIdParamSchema>;
