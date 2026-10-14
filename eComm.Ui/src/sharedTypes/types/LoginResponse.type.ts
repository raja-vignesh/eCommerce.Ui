import z from "zod";
import { LoginResponseSchema } from "../schemas/Login/LoginResponseSchema";

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
