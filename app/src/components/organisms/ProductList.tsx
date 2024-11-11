import React from "react";
import ProductCard from "@/components/molecules/ProductCard";

interface ProductListProps {
  title: string;
  products: {
    id: string;
    name?: string;
    imageUrl?: string;
    rating?: number | null;
    price: number;
  }[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <section className="product-list py-8">
      <h2 className="text-red-500 text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div key={item.id}>
            <ProductCard
              id={item.id}
              name={item.name || "Item"}
              imageUrl={item.imageUrl}
              rating={item.rating}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
