import z from "zod";

export const LoginRequestSchema = z.object({
  email: z.email("please enter a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
