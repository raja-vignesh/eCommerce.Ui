import z from "zod";
import { ProductsCategory } from "./ProductsCategory";

export const ProductResponseSchema = z.object({
  productId: z.uuid(),
  productName: z.string(),
  category: z.enum(ProductsCategory),
  unitPrice: z.number(),
  quantityInStock: z.number(),
});
