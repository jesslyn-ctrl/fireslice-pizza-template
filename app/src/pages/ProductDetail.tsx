import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder, MdStar } from "react-icons/md";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContext } from "@/lib/firebase";
import NotFound from "./NotFound";
import { 
    handleGetProductById, 
    handleAddToCartProduct,
    handleAddFavoritedProduct,
    handleDeleteFavoritedProduct,
    handleGetFavoritedProduct,
} from "@/lib/ProductService";
import { useError } from "@/contexts/ErrorContext";
import { useCart } from "@/contexts/CartContext";
import { formatRupiah } from "@/utils/rupiahFormatter";
import LoadingSpinner from "@/components/molecules/LoadingSpinner";

const ProductDetailPage = () => {
    const { id } = useParams() as { id: string };
    const auth = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState<User | null>(null);

    const [product, setProduct] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [userReview, setUserReview] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);

    const { setErrorMessage } = useError();
    const { cartCount, setCartCount } = useCart();

    // Fetch the product details
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            }
        });

        return () => unsubscribe();
    }, [id, auth]);

    // Fetch product details
    useEffect(() => {
        const checkIfFavorited =  async() => {
            try {
                const isFav = await handleGetFavoritedProduct(id);
                setIsFavorited(isFav);
            } catch (error) {
                console.error("Error checking if product is favorited:", error);
            }
        }
        
        if (id) {
            handleGetProductById(id).then((item) => {
                setProduct(item);
                setLoading(false);
            });
            checkIfFavorited();
        }
    }, [id, authUser]);

    // Handle add or remove favorited product
    const handleFavoriteToggle = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        // Check if user is authenticated
        if (!authUser) {
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
        if (!authUser) {
          setErrorMessage("You need to be logged in to add items to the cart");
          return;
        }
    
        // Add the init product to cart
        try {
          await handleAddToCartProduct(authUser.uid, id, product.price);
          console.log("Product added to cart:", id);
    
          // Increment the cart count in context
          setCartCount((prevCount) => prevCount + 1); 
        } catch (error) {
          console.error("Error adding product to cart:", error);
          setErrorMessage("Something went wrong. Please try again.");
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!product) return <NotFound />;

    return (
        <div className="container mx-auto p-4 bg-white min-h-screen text-black">
            <div className="flex flex-col md:flex-row mb-8">
                <img
                    className="w-full md:w-1/3 object-cover rounded-lg shadow-md"
                    src={product.imageUrl}
                    alt={product.name}
                />
                <div className="md:ml-8 mt-4 md:mt-0 flex-1">
                    <h1 className="text-5xl font-bold mb-2">{product.name}</h1>
                    <div className="flex items-center text-yellow-500 mb-4">
                        <MdStar className="text-yellow-500" size={24} />
                        <span className="ml-1 text-gray-400 text-lg">{product.rating}</span>
                    </div>
                    <p className="text-lg mb-2 py-4">
                        {product.description}
                    </p>
                    <p className="text-lg mb-4 py-4 font-bold text-red-600">
                        {formatRupiah(product.price)}
                    </p>
                    <div className="text-sm space-y-2">
                        <p>
                            <span className="font-bold">Category:</span> {product.category}
                        </p>
                    </div>
                    <div className="mt-4 flex space-x-4">
                        <button
                            className="flex items-center justify-center p-1 text-red-500 hover:text-red-600 transition-colors duration-200"
                            aria-label="Favorite"
                            onClick={handleFavoriteToggle}
                        >
                            {isFavorited ? (
                                <MdFavorite size={24} />
                            ) : (
                                <MdFavoriteBorder size={24} />
                            )}
                        </button>
                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="px-4 py-2 font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* User Review */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">User Reviews</h2>
                {!userReview ? (
                <form
                    className="mb-4 p-4 bg-slate-50 rounded-lg shadow-md"
                >
                    <h3 className="text-xl font-bold mb-2">Leave Your Review</h3>
                    <textarea
                        className="w-full p-2 rounded-lg bg-white text-black mb-2 border border-gray-300 focus:border-red-500 focus:outline-none"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                    />
                    <div className="flex items-center mb-2">
                    <label className="mr-2">Rating:</label>
                    <input
                        type="number"
                        className="p-1 rounded-lg bg-white text-black border border-gray-300 focus:border-red-500 focus:outline-none"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        min="1"
                        max="5"
                        step="0.5"
                    />
                    </div>
                    <button
                    type="submit"
                    className="px-4 py-2 font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                    >
                    Submit Review
                    </button>
                </form>
                ) : null}
            </div>
        </div>
    );
}

export default ProductDetailPage;