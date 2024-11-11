import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder, MdStar } from "react-icons/md";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContext } from "@/lib/firebase";
import { formatRupiah } from "@/utils/rupiahFormatter";
import { useError } from "@/contexts/ErrorContext";
import { useCart } from "@/contexts/CartContext";
import { 
    handleAddToCartProduct, 
    handleAddFavoritedProduct,
    handleDeleteFavoritedProduct,
    handleGetFavoritedProduct,
} from "@/lib/ProductService"

interface ProductCardProps {
    id: string;
    name: string;
    imageUrl?: string;
    rating?: number | null;
    price: number;
}

const ProductCard = ({ id, name, imageUrl, rating, price }: ProductCardProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const { setErrorMessage } = useError();
    const { cartCount, setCartCount } = useCart();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkIfFavorited =  async() => {
            try {
                const isFav = await handleGetFavoritedProduct(id);
                setIsFavorited(isFav);
            } catch (error) {
                console.error("Error checking if product is favorited:", error);
            }
        }
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                checkIfFavorited();
            } else {
                setIsFavorited(false);
            }
        });

        return () => unsubscribe();
    }, [auth, id]);

    // Handle add or remove favorited product
    const handleFavoriteToggle = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        // Check if user is authenticated
        if (!user) {
            setErrorMessage("You need to be logged in to add the product to your favorites");
            return;
        }
        try {
          const isFav = await handleGetFavoritedProduct(id);
          if (isFav) {
            await handleDeleteFavoritedProduct(id);
          } else {
            await handleAddFavoritedProduct(id);
          }
          setIsFavorited(!isFav);
        } catch (error) {
          console.error("Error updating favorite status:", error);
        }
    }

    // Handle Add to Cart
    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        // Check if user is authenticated
        if (!user) {
            setErrorMessage("You need to be logged in to add items to the cart");
            return;
        }
        
        // Add the init product to cart
        await handleAddToCartProduct(user.uid, id, price)
        console.log("Product added to cart:", id);

        // Increment the cart count in context
        setCartCount(prevCount => prevCount + 1); 
    };

    const handleCardClick = () => {
        navigate(`/product/${id}`);
    }

    return (
        <div
            className="bg-slate-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-1000 transform hover:scale-105 cursor-pointer w-64 h-[440px]"
            onClick={handleCardClick}
        >
            <div>
                <img className="w-full h-64 object-cover" src={imageUrl} alt={name} />
                <div className="p-4">
                    <div className="font-bold text-lg mb-1 text-black whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {name}
                    </div>
                    <div className="flex flex-row gap-6 justify-between w-full">

                    <div className="flex space-x-2 items-center">
                    <button
                        className="flex items-center justify-center p-1 text-red-500 hover:text-red-600 transition-colors duration-200"
                        aria-label="Favorite"
                        onClick={handleFavoriteToggle}
                    >
                        {isFavorited ? (
                        <MdFavorite size={20} />
                        ) : (
                        <MdFavoriteBorder size={20} />
                        )}
                    </button>
                    </div>
                    <div className="flex items-center text-yellow-500">
                        <MdStar className="text-yellow-500" size={20} />
                        <span className="ml-1 text-gray-500">{rating ?? "N/A"}</span>
                    </div>
                    </div>
                    <div className="mt-2 text-gray-400">
                        <span className="ml-1 text-black font-semibold">{formatRupiah(price)}</span>
                    </div>
                </div>
                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded-md font-semibold shadow-lg transition-colors duration-200"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;