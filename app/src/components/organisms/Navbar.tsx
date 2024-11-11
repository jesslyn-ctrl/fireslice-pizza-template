import React, { useEffect, useState, useContext } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { 
    handleAuthStateChange, 
    handleGetUserCart,
} from '@/lib/ProductService';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '@/lib/firebase';
import firebaseLogo from '@/assets/fireslice_pizza_logo.png';
import googleLogo from '@/assets/google_logo.png';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);
    // const [cartCount, setCartCount] = useState<number>(0);
    const { cartCount, setCartCount } = useCart();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = handleAuthStateChange(auth, setUser);
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        if (user) {
            // Fetch user's cart data whenever the user is logged in
            const fetchCartData = async () => {
                const cartData = await handleGetUserCart(user.uid); 
                const cartItems = cartData || [];
                // Sum the qty of all items in the cart
                const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
                setCartCount(totalQty); 
            };
            fetchCartData();
        } else {
            setCartCount(0);
        }
    }, [user, setCartCount]);

    // Handle login with firebase auth
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log("User logged in successfully!");
        } catch (error) {
            console.error("Error during Login:", error);
        }
    };

    // Handle logout with firebase auth
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            console.log('User logged out successfully!');
            window.location.reload();
          } catch (error) {
            console.error('Error during Logout:', error);
          }
    }

    return (
        <nav className="bg-slate-50 p-4 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center">
                    <img src={firebaseLogo} alt="Firebase Logo" width={40} height={40} className="mr-2" />
                    <span className=" text-black text-lg font-bold hidden md:block">FireSlice Pizza</span>
                </Link>
            </div>
            <Link to="/search" className="flex items-center text-gray-400 hover:text-gray-500 mx-auto">
                <FaSearch className="mr-2" />
                Search
            </Link>
            <div className="flex items-center space-x-4">
                <Link to="/cart" className="text-red-500 hover:text-red-600 flex items-center relative">
                    <FaShoppingCart size={25} />
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full text-xs px-1.5 py-0.5">
                            {cartCount}
                        </span>
                    )}
                </Link>
                {user && (
                <Link to="/my-profile" className="text-red-500 hover:text-red-600">
                    My Profile
                </Link>
                )}
                {user ? (
                <>
                    <span className="text-black font-semibold mr-4">Hi, {user.displayName}</span>
                    <button onClick={handleLogout} className="text-orange-400 hover:text-orange-500 font-semibold">
                        Logout
                    </button>
                </>
                ) : (
                <button onClick={handleLogin} className="flex bg-orange-400 hover:bg-orange-500 px-2 py-1 border rounded-md items-center text-gray-400 hover:text-gray-500 cursor-pointer">
                    <img src={googleLogo} alt="Google-Logo" width={30} height={30} className="mr-2" />
                    <p className="font-semibold text-white">Login with Google</p>
                </button>
                )}
            </div>
            </div>
        </nav>
    );
}

export default Navbar;