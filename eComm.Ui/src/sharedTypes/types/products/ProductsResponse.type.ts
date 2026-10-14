import type z from "zod";
import type { ProductsResponseSchema } from "../../schemas/Products/ProductResponseSchema";
import type { PagedResponseSchema } from "../../schemas/pagedResult/PagedResponseSchema";

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type PagedResponse = z.infer<typeof PagedResponseSchema>;
