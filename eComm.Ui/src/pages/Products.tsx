import toast from "react-hot-toast";
import { useProducts } from "../hooks/products/useProducts";
import { useEffect } from "react";
import ProductCard from "../ui/products/ProductCard";
import { Pagination } from "../ui/Pagination";
import { useSearchParams } from "react-router-dom";
const PRODUCTS_TOAST_ID = "products-fetching";
const PAGE_SIZE = 10;

const Products = () => {
  //const [pageNumber, setPageNumber] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") ?? "";
  const rawPage = Number(searchParams.get("pageNumber") ?? "1");
  const pageNumber = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  console.log(`search term ${searchTerm}`);
  const { data, isPending, isError, error, isFetching } = useProducts(
    pageNumber,
    PAGE_SIZE,
    searchTerm,
  );

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

  const handlePageChange = (page: number) => {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      next.set("pageNumber", String(page));
      return next;
    });
  };

  return (
    <div>
      {data?.items.length === 0 && <p>No Products Found</p>}
      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={pageNumber}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 xs:grid-cols-1 m-5">
        {data?.items.map((p) => (
          <li className="my-2" key={p.productId}>
            {" "}
            <ProductCard key={p.productId} product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
