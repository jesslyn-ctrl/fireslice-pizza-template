import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { handleCreateOrder } from '@/lib/ProductService';
import { formatRupiah } from "@/utils/rupiahFormatter";
import { useError } from "@/contexts/ErrorContext";
import { useCart } from '@/contexts/CartContext';

interface OrderSummaryCardProps {
  subtotal: number;
  userId: string;  
}

const OrderSummaryCard = ({ subtotal, userId }: OrderSummaryCardProps) => {
  const { setErrorMessage } = useError();
  const { cartCount, setCartCount } = useCart();
  const navigate = useNavigate()

  const handleCheckout = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Check if user is authenticated
    if (!userId) {
        setErrorMessage("You need to be logged in to checkout your order");
      return;
    }

    try {
      await handleCreateOrder(userId);

      // Show success message with SweetAlert2
      Swal.fire({
        title: 'Order Completed Successfully!',
        text: 'Your order has been placed successfully.',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f87171',
      }).then(() => {
        // Set cart count to 0 because all products already been checked out
        setCartCount(0);
        // Redirect to home page after successful order
        navigate("/");
      });
    } catch (error) {
      setErrorMessage("There was an issue creating the order. Please try again later");
    }
  }

  return (
    <div className="border py-5 px-4 shadow-md">
      <p className="font-bold uppercase mb-4">Order Summary</p>

      <div className="flex justify-between border-b py-5">
        <p>Subtotal</p>
        <p>{formatRupiah(subtotal)}</p>
      </div>

      <div className="flex justify-between border-b-2 py-5">
        <p>Shipping</p>
        <p>Free</p>
      </div>

      <div className="flex justify-between py-5 font-bold text-red-600">
        <p>Total</p>
        <p>{formatRupiah(subtotal)}</p>
      </div>

      <button 
        onClick={handleCheckout}
        className="block w-full bg-red-500 px-5 py-2 font-semibold text-white rounded-md shadow-md transition duration-200 ease-in-out hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={subtotal === 0}
      >
        Checkout
      </button>
    </div>
  );
};
  
export default OrderSummaryCard;