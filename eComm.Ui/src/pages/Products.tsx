import { useEffect, useState } from "react";
import type { ProductsResponse } from "../sharedTypes/types/products/ProductsResponse.type";
import { getProductsRequest } from "../services/requests/products/ProductRequest";
import { ApiError } from "../sharedTypes/ApiError";

const Products = () => {
  const [products, setProducts] = useState<ProductsResponse>();
  const [errorDetail, setErrorDetail] = useState<string>();
  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const response = await getProductsRequest({
          pageNumber: 1,
          pageSize: 10,
          signal: controller.signal,
        });
        setProducts(response);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          console.log("Products request cancelled");
          return;
        }
        if (error instanceof ApiError) {
          console.error("Status:", error.status);
          console.error("Title:", error.title);
          console.error("Detail:", error.detail);
          setErrorDetail(error.detail);
          return;
        }
      }
    };
    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);
  return <div>Products</div>;
};

export default Products;
