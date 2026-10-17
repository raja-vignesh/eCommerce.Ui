import { useQuery } from "@tanstack/react-query";
import { searchProductsRequest } from "../../services/requests/products/ProductRequest";
import { QUERY_STALE_TIME } from "../../constants/queryContants";

export const useSearchProducts = (
  searchTerm: string,
  pageNumber: number,
  pageSize: number,
) => {
  return useQuery({
    queryKey: ["products", "search", pageNumber, pageSize],
    queryFn: ({ signal }) => {
      return searchProductsRequest({
        searchTerm,
        pageNumber,
        pageSize,
        signal,
      });
    },
    enabled: searchTerm.trim().length > 0,
    staleTime: QUERY_STALE_TIME.ONE_MINUTE,
  });
};
