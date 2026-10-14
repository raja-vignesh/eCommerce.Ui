import type z from "zod";
import type { LoginRequestSchema } from "../schemas/Login/LoginRequestSchema";

export type LoginRequestType = z.infer<typeof LoginRequestSchema>;
