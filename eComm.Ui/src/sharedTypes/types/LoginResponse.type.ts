import z from "zod";
import { LoginResponseSchema } from "../schemas/LoginResponseSchema";

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
