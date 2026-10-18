import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Modal } from "../Modal";

import {
  ProductFormSchema,
  type ProductFormValues,
} from "../../sharedTypes/schemas/Products/ProductFormSchema";
import type { ProductResponse } from "../../sharedTypes/types/products/ProductsResponse.type";
import { useUpdateProducts } from "../../hooks/products/useUpdateProducts";

type EditProductModalProps = {
  product: ProductResponse | null;
  onClose: () => void;
};

export const EditProductModal = ({
  product,
  onClose,
}: EditProductModalProps) => {
  const updateMutation = useUpdateProducts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
  });

  // Populate the selected product's values
  useEffect(() => {
    if (!product) return;

    reset({
      productName: product.productName,
      category: product.category,
      unitPrice: product.unitPrice,
      quantityInStock: product.quantityInStock,
    });
  }, [product, reset]);

  const onSubmit = async (values: ProductFormValues) => {
    if (!product) return;

    try {
      await updateMutation.mutate({
        productId: product.productId,
        product: values,
      });

      toast.success("Product updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update product");
    }
  };

  return (
    <Modal isOpen={product !== null} onClose={onClose} title="Edit Product">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="productName" className="mb-1 block font-medium">
            Product Name
          </label>
          <input
            id="productName"
            {...register("productName")}
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.productName && (
            <p className="text-sm text-red-500">{errors.productName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block font-medium">
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className="w-full rounded border border-gray-300 bg-white p-2"
          >
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="HomeAppliances">Home Appliances</option>
          </select>

          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="unitPrice" className="mb-1 block font-medium">
            Unit Price
          </label>
          <input
            id="unitPrice"
            type="number"
            step="0.01"
            {...register("unitPrice", { valueAsNumber: true })}
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.unitPrice && (
            <p className="text-sm text-red-500">{errors.unitPrice.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="quantityInStock" className="mb-1 block font-medium">
            Quantity in Stock
          </label>
          <input
            id="quantityInStock"
            type="number"
            step="1"
            {...register("quantityInStock", { valueAsNumber: true })}
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.quantityInStock && (
            <p className="text-sm text-red-500">
              {errors.quantityInStock.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={updateMutation.isPending}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="rounded bg-indigo-800 px-4 py-2 font-medium text-white disabled:opacity-50"
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
