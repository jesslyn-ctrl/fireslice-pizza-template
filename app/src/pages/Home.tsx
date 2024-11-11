import React, { useEffect, useState } from 'react';
import Carousel from '@/components/organisms/Carousel'
import ProductList from '@/components/organisms/ProductList'
import { handleGetTopProducts, handleGetAllProducts } from '@/lib/ProductService';

const HomePage = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const topProductsData = await handleGetTopProducts(5);
            const allProductsData = await handleGetAllProducts();
            
            if (topProductsData) setTopProducts(topProductsData);
            if (allProductsData) setAllProducts(allProductsData);
        } 
        // Call the fetchProducts
        fetchProducts();      
    }, []);

    return (
        <div className="container mx-auto p-4 bg-white text-black shadow-md min-h-screen">
            <Carousel title="Top 5 Products" products={topProducts} />
            <ProductList title="All Products" products={allProducts} />
        </div>
    );
}

export default HomePage;