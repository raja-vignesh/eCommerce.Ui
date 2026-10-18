import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductRequest } from "../../services/requests/products/ProductRequest";
import type { ProductFormValues } from "../../sharedTypes/schemas/Products/ProductFormSchema";

type UpdateInput = {
  product: ProductFormValues;
  productId: string;
  signal?: AbortSignal;
};

export const useUpdateProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product, productId, signal }: UpdateInput) =>
      updateProductRequest(productId, product, signal),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
