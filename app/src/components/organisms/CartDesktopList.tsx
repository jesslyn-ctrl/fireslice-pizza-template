
import React, { useState, useEffect } from "react";
import CartDesktopCard from "@/components/molecules/CartDesktopCard";

interface CartItem {
  id: string;
  userId: string;
  itemPrice: number;
  qty: number;
  isCheckout: boolean;
  totalPrice: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface CartListProps {
  carts: CartItem[];
  onCartUpdate: (updatedCarts: CartItem[]) => void;
}

const CartDesktopList = ({ carts: initialCarts, onCartUpdate }: CartListProps) => {
  const [carts, setCarts] = useState(initialCarts);

  const updateCartQuantity = (id: string, newQty: number) => {
    const updatedCarts = carts.map((item) =>
      item.id === id
        ? { ...item, qty: newQty, totalPrice: newQty * item.itemPrice }
        : item
    );
    setCarts(updatedCarts);
    onCartUpdate(updatedCarts);
  };

  useEffect(() => {
    // You might want to ensure that carts are updated when initialCarts change
    setCarts(initialCarts);
  }, [initialCarts]);

  return (
    <div className="overflow-y-auto h-[620px]">
      <table className="table-fixed w-full">
        <thead className="sticky top-0 h-16 bg-neutral-100">
          <tr>
            <th className="px-6 py-2"></th>
            <th className="px-6 py-2">ITEM</th>
            <th className="px-6 py-2">PRICE</th>
            <th className="px-6 py-2">QUANTITY</th>
            <th className="px-6 py-2">TOTAL</th>
            <th className="px-6 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {carts.map((item) => (
            <CartDesktopCard 
              key={item.id}
              id={item.id}
              itemPrice={item.itemPrice}
              qty={item.qty}
              totalPrice={item.totalPrice}
              product={item.product}
              onQtyChange={updateCartQuantity}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
  
export default CartDesktopList;