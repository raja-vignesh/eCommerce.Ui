import z from "zod";
import { ProductsCategory } from "./ProductsCategory";

export const ProductFormSchema = z.object({
  productName: z.string().trim().min(1, "Product name is required").max(50),
  category: z.enum(ProductsCategory),
  unitPrice: z.number().positive("price must be greater than 0"),
  quantityInStock: z.number().positive("Stock cannot be negative"),
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;
