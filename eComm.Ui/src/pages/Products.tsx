import { ProductsTable } from "../ui/products/ProductsTable";
import { useProducts } from "../hooks/products/useProducts";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDeleteProduct } from "../hooks/products/useDeleteProduct";
const PRODUCTS_TOAST_ID = "products-fetching";
const PAGE_SIZE = 10;
import { useState } from "react";
import type { ProductResponse } from "../sharedTypes/types/products/ProductsResponse.type";
import { EditProductModal } from "../ui/products/EditProductModal";

const Products = () => {
  // Inside ManageProducts:
  const [editingProduct, setEditingProduct] = useState<ProductResponse | null>(
    null,
  );
  const { data, isPending, isError, isFetching, error } = useProducts(
    1,
    PAGE_SIZE,
  );
  const deleteMutation = useDeleteProduct();

  const handleDelete = (productId: string) => {
    deleteMutation.mutate(productId, {
      onSuccess: () =>
        toast.success(`Product ${productId} deleted successfully`),
      onError: () => toast.error(`Failed to delete product ${productId}`),
    });
  };

  useEffect(() => {
    if (isPending && isFetching)
      toast.loading("Loading Products...", { id: PRODUCTS_TOAST_ID });
    else if (isFetching)
      toast.loading("Refreshing Products...", { id: PRODUCTS_TOAST_ID });
    else toast.dismiss(PRODUCTS_TOAST_ID);
    return () => toast.dismiss(PRODUCTS_TOAST_ID);
  }, [isPending, isFetching]);

  if (isError && !data) {
    console.error(error.message);
    return <p>Failed to load products</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Manage Products</h1>

      <ProductsTable
        products={data?.items ?? []}
        onEdit={(product) => {
          console.log("Edit:", product.productId);
          setEditingProduct(product);
        }}
        onDelete={(product) => {
          console.log("Delete:", product.productId);
          handleDelete(product.productId);
        }}
      />
      <EditProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
      />
    </div>
  );
};

export default Products;
