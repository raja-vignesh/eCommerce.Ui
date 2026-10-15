import { useProducts } from "../hooks/products/useProducts";

const Products = () => {
  const { data, isPending, isError, error, isFetching } = useProducts(1, 10);
  if (isPending) {
    return <p>Loading Products...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      {isFetching && <p>Refreshing Products...</p>}
      <ul>
        {data.items.map((p) => (
          <li key={p.productId}>{p.productName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
