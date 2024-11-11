import React, { useEffect, useState, useContext } from 'react';
import CartDesktopList from '@/components/organisms/CartDesktopList';
import OrderSummaryCard from '@/components/molecules/OrderSummaryCard';
import { AuthContext } from "@/lib/firebase";
import { handleGetUserCart } from '@/lib/ProductService';
import { onAuthStateChanged, User } from "firebase/auth";
import { useCart } from '@/contexts/CartContext';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';

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

const CartPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);
    const { cartCount, setCartCount } = useCart();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user);
            setUser(user);
          }
      });

      return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
      const fetchCarts = async () => {
        const cartsData = await handleGetUserCart(user.uid);
        console.log(cartsData);
        if (cartsData) setCarts(cartsData);
        setLoading(false);
      }
      // Call the fetchCarts
      if (user) {
        fetchCarts();
      }
    }, [user]);

    // Calculate subtotal
    const calculateSubtotal = () => {
      return carts.reduce((sum, item) => sum + item.totalPrice, 0);
    };

    const handleCartUpdate = (updatedCarts: CartItem[]) => {
      setCarts(updatedCarts);
    };

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <section className="mt-24 md:mt-2">
        <div className="container mx-auto min-h-screen w-full border-b py-5 lg:flex lg:flex-row lg:py-10">
        {cartCount === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full py-10">
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/462/240/non_2x/empty-shopping-cart-illustration-concept-on-white-background-vector.jpg"
              alt="Cart is empty"
              className="w-full max-w-lg mb-8"
            />
            <p className="text-lg font-semibold text-gray-700">Your cart is currently empty</p>
            <p className="text-gray-500">Start shopping to add items to your cart.</p>
          </div>
        ) : ( 
          <>
            {/* Desktop Cart */}
            <div className="hidden w-full lg:w-2/3 grid-cols-1 gap-3 px-5 pb-10 md:grid">
              <div id="cart-container">
                <CartDesktopList carts={carts} onCartUpdate={handleCartUpdate} />
              </div>
            </div>

            {/* Order Summary */}
            <div className="mx-auto w-full lg:w-1/3 px-4 md:max-w-[750px] lg:max-w-[400px]">
              <OrderSummaryCard subtotal={calculateSubtotal()} userId={user.uid} />
            </div>
          </>
        )}
        </div>
      </section>
    );
}

export default CartPage;