import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Modal } from "../Modal";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";

import {
  ProductFormSchema,
  type ProductFormValues,
} from "../../sharedTypes/schemas/Products/ProductFormSchema";
import type { ProductResponse } from "../../sharedTypes/types/products/ProductsResponse.type";
import { useUpdateProducts } from "../../hooks/products/useUpdateProducts";

type ProductFormModalProps = {
  isOpen: boolean;
  product: ProductResponse | null;
  onClose: () => void;
};

const emptyProduct: ProductFormValues = {
  productName: "",
  category: "Electronics",
  unitPrice: 0,
  quantityInStock: 0,
};

export const ProductFormModal = ({
  isOpen,
  product,
  onClose,
}: ProductFormModalProps) => {
  const isEditMode = product !== null;

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProducts();

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: emptyProduct,
  });

  useEffect(() => {
    if (!isOpen) return;

    if (product) {
      reset({
        productName: product.productName,
        category: product.category,
        unitPrice: product.unitPrice,
        quantityInStock: product.quantityInStock,
      });
    } else {
      reset(emptyProduct);
    }
  }, [product, isOpen, reset]);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (product) {
        await updateMutation.mutateAsync({
          productId: product.productId,
          product: values,
        });

        toast.success("Product updated successfully");
      } else {
        await createMutation.mutateAsync({ product: values });

        toast.success("Product created successfully");
      }

      onClose();
    } catch {
      toast.error("Failed to save product");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSaving ? () => {} : onClose}
      title={isEditMode ? "Edit Product" : "Add Product"}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="productName" className="block font-medium">
            Product Name
          </label>

          <input
            id="productName"
            {...register("productName")}
            className="w-full rounded border p-2"
          />

          {errors.productName && (
            <p className="text-sm text-red-500">{errors.productName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>

          <select
            id="category"
            {...register("category")}
            className="w-full rounded border p-2"
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
          <label htmlFor="unitPrice" className="block font-medium">
            Unit Price
          </label>

          <input
            id="unitPrice"
            type="number"
            step="0.01"
            {...register("unitPrice", { valueAsNumber: true })}
            className="w-full rounded border p-2"
          />

          {errors.unitPrice && (
            <p className="text-sm text-red-500">{errors.unitPrice.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="quantityInStock" className="block font-medium">
            Quantity in Stock
          </label>

          <input
            id="quantityInStock"
            type="number"
            step="1"
            {...register("quantityInStock", {
              valueAsNumber: true,
            })}
            className="w-full rounded border p-2"
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
            disabled={isSaving}
            className="rounded border px-4 py-2 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded bg-indigo-800 px-4 py-2 font-semibold text-white disabled:opacity-50"
          >
            {isSaving
              ? "Saving..."
              : isEditMode
                ? "Update Product"
                : "Create Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
