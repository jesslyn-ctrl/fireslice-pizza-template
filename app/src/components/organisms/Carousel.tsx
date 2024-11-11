import React from 'react';
import ProductCard from '@/components/molecules/ProductCard';

interface CarouselProps {
    title: string;
    products: {
        id: string;
        name?: string;
        imageUrl?: string;
        rating?: number | null;
        price: number;
    }[];
}

const Carousel = ({ title, products }: CarouselProps) => {
    return (
        <section className="carousel py-8">
            <h2 className="text-red-500 text-2xl font-bold mb-4">{title}</h2>
            <div className="carousel__container flex overflow-x-auto space-x-4 overflow-y-clip">
            {products.map((item) => (
                <div className="flex-shrink-0" key={item.id}>
                <ProductCard
                    id={item.id}
                    name={item.name || 'Item'}
                    imageUrl={item.imageUrl}
                    rating={item.rating}
                    price={item.price}
                />
                </div>
            ))}
            </div>
        </section>
    ); 
}

export default Carousel;