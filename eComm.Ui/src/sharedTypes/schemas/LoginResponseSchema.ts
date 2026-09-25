import z from "zod";

export const LoginResponseSchema = z.object({
  userId: z.uuid(),
  email: z.string(),
  personName: z.string(),
  token: z.string().nullable(),
  success: z.boolean(),
});
