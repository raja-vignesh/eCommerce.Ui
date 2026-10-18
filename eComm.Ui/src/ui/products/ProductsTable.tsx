import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Table, { type TableColumn } from "../Table";
import type { ProductResponse } from "../../sharedTypes/types/products/ProductsResponse.type";

type ProductsTableProps = {
  products: ProductResponse[];
  onEdit: (product: ProductResponse) => void;
  onDelete: (product: ProductResponse) => void;
};

export const ProductsTable = ({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) => {
  const columns: TableColumn<ProductResponse>[] = [
    {
      header: "Product Name",
      render: (product) => product.productName,
    },
    {
      header: "Category",
      render: (product) => product.category,
    },
    {
      header: "Unit Price",
      render: (product) => `$${product.unitPrice.toFixed(2)}`,
    },
    {
      header: "Quantity in Stock",
      render: (product) => product.quantityInStock,
    },
    {
      header: "Actions",
      render: (product) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex cursor-pointer items-center gap-2 rounded bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-600"
          >
            <FaPencilAlt />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(product)}
            className="flex cursor-pointer items-center gap-2 rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      data={products}
      columns={columns}
      getRowKey={(product) => product.productId}
      emptyMessage="No products found"
    />
  );
};
