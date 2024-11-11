// Products
// import { listProducts, ListProductsData, OrderDirection } from "@product/dataconnect";
// import { listProductSearch, ListProductSearchData } from "@product/dataconnect";
// import { getProductById, GetProductByIdData } from "@product/dataconnect";

// Users
// import { upsertUser } from "@product/dataconnect";
// import { getCurrentUser, GetCurrentUserData } from "@product/dataconnect";

// Carts
// import { getCartById, GetCartByIdData } from "@product/dataconnect";
// import { getUserCart, GetUserCartData } from "@product/dataconnect";
// import { addToCart, updateUserCartById, deleteUserCartProductById } from "@product/dataconnect";

// Orders, OrderDetails
// import { createOrder, createOrderDetail } from "@product/dataconnect";
// import { addFavoritedProduct, deleteFavoritedProduct, getFavoritedProduct } from "@product/dataconnect";

import { onAuthStateChanged, User } from "firebase/auth";
import { generateOrderNumber } from "@/utils/generator";

// Fetch top-rated products
export const handleGetTopProducts = async (
    limit: number
): Promise<any | null> => {
    return null;
};

// Fetch all products
export const handleGetAllProducts = async (): Promise<any | null> => {
    // TODO: uncomment code below
    // try {
    //     const response = await listProducts({
    //         orderByRating: OrderDirection.DESC,
    //     });
    //     return response.data?.products;
    // } catch (error) {
    //     console.error("Error fetching top products: ", error);
    //     return null;
    // }
    return null;
};

// Fetch product detail by ID
export const handleGetProductById = async (
    productId: string
): Promise<any | null> => {
    // TODO: add your logic here
    return null;
};

// Updates user table when user signs in
export const handleAuthStateChange = (auth: any, setUser: (user: User | null) => void) => {
    // TODO: uncomment code below
    // return onAuthStateChanged(auth, async (user) => {
    //     if (user) {
    //         setUser(user);
    //         const username = user.email?.split("@")[0] || "anonymous";
    //         await upsertUser({ username });
    //     } else {
    //         setUser(null);
    //     }
    // })
};

// Fetch current user profile
export const handleGetCurrentUser = async (): Promise<any | null> => {
    // TODO: add your logic here
    return null;
};

// Update or insert authenticated user data
export const handleUpsertCurrentUser = async (
    username: string,
    address: string,
    phoneNumber: string
): Promise<void> => {
    // TODO: add your logic here
}

// Add a product to user's cart
export const handleAddToCartProduct = async (
    userId: string,
    productId: string,
    itemPrice: number
): Promise<void> => {
    // TODO: add your logic based on the steps
    try {
        // Step 1: Fetch the user's current cart list
        const userCartList = await handleGetUserCart(userId);

        // Step 2: Check if the product already exists in the cart
        const existingCartItem = userCartList.find(cartItem => cartItem.product.id === productId);

        // Step 3: Check if there is exists cart item based on product & if the exists cart item has isCheckout = false
        if (existingCartItem && !existingCartItem.isCheckout) {
            // Step 3.1.1: Increment the existing cart item qty by 1

            // Step 3.1.2: Update the existing cart item if it matches productId and is not checked out
        } else {
            // Step 3.2.1: If the product doesn't exist in the cart or is already checked out, add as a new item
        }
    } catch (error) {
        console.error("Error add to cart: ", error);
        throw error;
    }
};

// Fetch user's cart data
export const handleGetUserCart = async (
    userId: string
): Promise<any | null> => {
    // TODO: uncomment code below
    // try {
    //     const response = await getUserCart({
    //          userId,
    //          orderByRowNum: OrderDirection.DESC,
    //     });
    //     return response.data?.carts;
    // } catch (error) {
    //     console.error("Error fetching user cart data: ", error);
    //     return null;
    // }
    return null;
}

// Update product's qty in user's cart
export const handleUpdateCart = async (
    cartId: string,
    qty: number,
    itemPrice: number,
    isCheckout: boolean
): Promise<void> => {
    // TODO: uncomment code below
    // try {
    //     const totalPrice = qty * itemPrice;
    //     const userProductCart = await getCartById({ id: cartId });

    //     if (userProductCart.data.cart && !userProductCart.data?.cart?.isCheckout) {
    //         await updateUserCartById({ 
    //             id: cartId, 
    //             qty, 
    //             itemPrice, 
    //             totalPrice,
    //             isCheckout
    //         });
    //         console.log("Update cart: ", cartId);
    //     }
    // } catch (error) {
    //     console.error("Error update cart: ", error);
    //     throw error;
    // }
};

// Remove a product item from cart
export const handleDeleteCartProduct = async (
    cartId: string
): Promise<void> => {
    // TODO: uncomment code below
    // try {
    //     const userProductCart = await getCartById({ id: cartId });

    //     if (userProductCart.data.cart && !userProductCart.data?.cart?.isCheckout) {
    //         await deleteUserCartProductById({ id: cartId });
    //         console.log("Delete product from cart: ", cartId);
    //     }
    // } catch (error) {
    //     console.error("Error delete product from cart: ", error);
    //     throw error;
    // }
};

// Create order based on user's cart items
export const handleCreateOrder = async (
    userId: string
): Promise<void> => {
    try {
        const orderNo = generateOrderNumber();
        // Fetch the user's current cart list
        const userCartList = await handleGetUserCart(userId);

        // Calculate total amount by summing up totalPrice from each cart item
        const totalAmount = userCartList.reduce((sum, cartItem) => {
            return sum + cartItem.totalPrice;
        }, 0);

        // Step 1: Call the createOrder function to create the parent order data

        // Step 2: Extract the orderId from the createdOrder response

        // Create order details for each cart item
        for (const cartItem of userCartList) {
            // Step 3: Call the createOrderDetail function to create the child orders data based on cart items

            // Step 4: Update cart's isCheckout value to true
        }

    } catch (error) {
        console.error("Error creating order: ", error);
        throw error;
    }
}

// Add a product to user's favorites
export const handleAddFavoritedProduct = async (
    productId: string
): Promise<void> => {
    // TODO: add your logic here
};

// Remove a product from user's favorites
export const handleDeleteFavoritedProduct = async (
    productId: string
): Promise<void> => {
    // TODO: add your logic here
};
  
// Check if the product is favorited by the user
export const handleGetFavoritedProduct = async (
    productId: string
): Promise<boolean> => {
    // TODO: add your logic here
    return false;
};

// Add a review to a product
export const handleAddReview = async (
    productId: string,
    rating: number,
    reviewText: string
): Promise<void> => {
    // TODO: add you logic here
};
  
  // Delete a review from a product
export const handleDeleteReview = async (productId: string): Promise<void> => {
    // TODO: add you logic here
};

// Function to perform the search using the query and filters
export const handleListProductSearch = async (
    searchKeyword: string,
    minRating: number,
    maxRating: number,
    category: string
): Promise<any | null> => {
    // TODO: uncomment code below
    // try {
    //     const response = await listProductSearch({
    //         keyword: searchKeyword,
    //         minRating,
    //         maxRating,
    //         category,
    //     });
    //     return response.data;
    // } catch (error) {
    //     console.error("Error performing search:", error);
    //     return null;
    // }
    return null;
};