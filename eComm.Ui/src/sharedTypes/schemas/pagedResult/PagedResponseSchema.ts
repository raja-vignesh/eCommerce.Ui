import z from "zod";
import { ProductsResponseSchema } from "../Products/ProductResponseSchema";

export const PagedResponseSchema = z.object({
  items: ProductsResponseSchema,
  totalResultsCount: z.number(),
  itemsFrom: z.number(),
  itemsTo: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  pageNumber: z.number(),
});
