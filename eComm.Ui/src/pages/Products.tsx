import toast from "react-hot-toast";
import { useProducts } from "../hooks/products/useProducts";
import { useEffect } from "react";
const PRODUCTS_TOAST_ID = "products-fetching";

const Products = () => {
  const { data, isPending, isError, error, isFetching } = useProducts(1, 10);

  useEffect(() => {
    if (isPending && isFetching)
      toast.loading("Loading Products...", { id: PRODUCTS_TOAST_ID });
    else if (isFetching)
      toast.loading("Refreshing Products...", { id: PRODUCTS_TOAST_ID });
    else toast.dismiss(PRODUCTS_TOAST_ID);
    return () => toast.dismiss(PRODUCTS_TOAST_ID);
  }, [isPending, isFetching]);

  if (isError) {
    console.error(error.message);
    return <p>Failed to load products</p>;
  }

  return (
    <div>
      {data?.items.length === 0 && <p>No Products Found</p>}
      <ul>
        {data?.items.map((p) => (
          <li key={p.productId}>{p.productName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
