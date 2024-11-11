
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; 
import { 
  handleUpdateCart, 
  handleDeleteCartProduct,
} from "@/lib/ProductService";
import { useCart } from "@/contexts/CartContext";
import { formatRupiah } from "@/utils/rupiahFormatter";

interface CartProps {
  id: string;
  itemPrice: number;
  qty: number;
  totalPrice: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  onQtyChange: (cartId: string, newQty: number) => void;
}

const CartDesktopCard: React.FC<CartProps> = ({ id, itemPrice, qty, totalPrice, product, onQtyChange }) => {
  const { cartCount, setCartCount } = useCart();
  
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Increment
    const newQty = qty + 1;
    onQtyChange(id, newQty);

    // Update the product in the cart
    handleUpdateCart(id, newQty, product.price, false);

    // Increment the cart count in context
    setCartCount((prevCount) => prevCount + 1); 
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Decrement
    if (qty > 1) {
      const newQty = qty - 1;
      onQtyChange(id, newQty);

      // Update the product in the cart
      handleUpdateCart(id, newQty, product.price, false);
    } else if (qty === 1) {
      // If the quantity is 1 and its decremented to 0, delete the product
      onQtyChange(id, 0);
      // Delete the product from the cart
      handleDeleteCartProduct(id);
    }

    // Decrement the cart count in context
    setCartCount((prevCount) => prevCount - 1); 
  }

  const handleRemoveProduct = () => {
    onQtyChange(id, 0);
    handleDeleteCartProduct(id);

    // Decrement the cart count in context
    setCartCount((prevCount) => prevCount - qty); 
  };

  // Conditionally only render the component if the cart qty is greater than 0
  if (qty === 0) return null;
  
  return (
      <tr className="h-[100px] border-b">
        {/* Image & Title Column */}
        <td className="align-middle">
          <div className="flex">
            <Link to={`/product/${product.id}`}>
              <div className="w-24 h-24 overflow-hidden flex items-center justify-center">
                <img
                    className="w-full h-full object-cover"
                    src={product.imageUrl}
                    alt={product.id}
                />
              </div>
            </Link>
          </div>
        </td>

        <td>
          <div className="ml-3 flex flex-col justify-center">
            <p className="text-md text-red-600 font-semibold p-6">
              {product.name}
            </p>
          </div>
        </td>
  
        {/* Price Column */}
        <td className="mx-auto text-center">{formatRupiah(product.price)}</td>
  
        {/* Quantity Column */}
        <td className="align-middle">
          <div className="flex items-center justify-center">
            <button 
              onClick={handleDecrement}
              className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
            >
              -
            </button>
            <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
              {qty}
            </div>
            <button 
              onClick={handleIncrement}
              className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
            >
              +
            </button>
          </div>
        </td>
  
        {/* Subtotal Column */}
        <td className="mx-auto text-center font-semibold">{formatRupiah(totalPrice)}</td>
  
        {/* Remove button column */}
        <td className="align-middle text-center">
          <button 
            onClick={handleRemoveProduct}
            className="transform transition duration-200 hover:scale-110"
          >
            <FaTrash className="w-5 h-5 text-gray-600 hover:text-red-600" />
          </button>
        </td>
      </tr>
    );
};
  
export default CartDesktopCard;