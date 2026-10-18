import type z from "zod";
import type {
  ProductResponseSchema,
  ProductsResponseSchema,
} from "../../schemas/Products/ProductResponseSchema";
import type { PagedResponseSchema } from "../../schemas/pagedResult/PagedResponseSchema";

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type PagedResponse = z.infer<typeof PagedResponseSchema>;
export type ProductType = z.infer<typeof ProductResponseSchema>;
