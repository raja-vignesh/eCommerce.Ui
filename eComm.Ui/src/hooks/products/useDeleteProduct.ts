import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductRequest } from "../../services/requests/products/ProductRequest";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProductRequest(productId),

    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
};
