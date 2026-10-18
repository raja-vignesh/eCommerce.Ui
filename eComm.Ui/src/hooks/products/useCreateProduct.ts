import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductFormValues } from "../../sharedTypes/schemas/Products/ProductFormSchema";
import { createProductRequest } from "../../services/requests/products/ProductRequest";

type CreateInput = {
  product: ProductFormValues;
  signal?: AbortSignal;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product, signal }: CreateInput) =>
      createProductRequest(product, signal),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
