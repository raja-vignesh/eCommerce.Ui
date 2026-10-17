import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
  getProductsRequest,
  searchProductsRequest,
} from "../../services/requests/products/ProductRequest";
import { QUERY_STALE_TIME } from "../../constants/queryContants";
import type { PagedResponse } from "../../sharedTypes/types/products/ProductsResponse.type";

export const useProducts = (
  pageNumber: number,
  pageSize: number,
  searchTerm = "",
): UseQueryResult<PagedResponse, Error> => {
  const term = searchTerm.trim();

  console.log("useProdcts");
  console.log(term);

  return useQuery({
    queryKey: ["products", pageNumber, pageSize, searchTerm],
    queryFn: ({ signal }) =>
      term
        ? searchProductsRequest({
            searchTerm: term,
            pageNumber,
            pageSize,
            signal,
          })
        : getProductsRequest({
            pageNumber,
            pageSize,
            signal,
          }),
    staleTime: QUERY_STALE_TIME.ONE_MINUTE,
  });
};
