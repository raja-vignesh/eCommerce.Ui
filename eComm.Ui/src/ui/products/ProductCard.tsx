import type { ProductType as Product } from "../../sharedTypes/types/products/ProductsResponse.type";

type ProductCardProps = {
  product: Product;
  onAddToCart?: () => void;
};

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="w-77.5 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{product.category}</p>

      <h2 className="mt-1 text-xl font-bold text-black">
        {product.productName}
      </h2>

      <p className="mt-5 font-semibold text-gray-600">
        ${product.unitPrice.toFixed(2)}
      </p>

      <hr className="my-4 border-gray-200" />

      <button
        type="button"
        onClick={onAddToCart}
        className="rounded bg-indigo-800 px-4 py-2 font-semibold text-white hover:bg-indigo-900 transition-colors cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
