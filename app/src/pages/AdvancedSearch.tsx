import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { handleListProductSearch } from "@/lib/ProductService";

const categories = ["Pizza", "Pasta", "Side Dish", "Dessert", "Salad"];

const AdvancedSearchPage = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [ratingRange, setRatingRange] = useState({ min: 1, max: 5});
    const [results, setResults] = useState({
        productsMatchingName: [],
        productsMatchingCategory: [],
    });

    // Handle the search
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchResults = await handleListProductSearch(
            searchKeyword,
            ratingRange.min,
            ratingRange.max,
            category
        );
        console.log(searchResults)
        setResults({
            productsMatchingName: searchResults?.productsMatchingName,
            productsMatchingCategory: searchResults?.productsMatchingCategory,
        });
    };

    return (
        <div className="container mx-auto p-4 bg-white min-h-screen text-black">
          <h1 className="text-4xl font-bold mb-4">Search</h1>
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex items-center mb-4">
              <label htmlFor="searchKeyword" className="sr-only">Search Keyword</label>
              <input
                id="searchKeyword"
                type="text"
                placeholder="Search for your foods..."
                className="w-full p-4 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 p-4 rounded bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                <FaSearch />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Search by Category */}
              <div>
                <label htmlFor="category" className="block mb-2">Category</label>
                <select
                  id="category"
                  className="w-full p-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((g) => (
                    <option key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {/* Search by Rating */}
              <div>
                <label htmlFor="minRating" className="block mb-2">Rating From</label>
                <input
                  id="minRating"
                  type="number"
                  className="w-full p-2 rounded bg-slate-50 text-black"
                  value={ratingRange.min}
                  onChange={(e) => setRatingRange({ ...ratingRange, min: Number(e.target.value) })}
                  min="1"
                  max="10"
                />
                <label htmlFor="maxRating" className="block mb-2 mt-2">Rating To</label>
                <input
                  id="maxRating"
                  type="number"
                  className="w-full p-2 rounded bg-slate-50 text-black"
                  value={ratingRange.max}
                  onChange={(e) => setRatingRange({ ...ratingRange, max: Number(e.target.value) })}
                  min="1"
                  max="10"
                />
              </div>
            </div>
          </form>
          <div className="results">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div>
              <h3 className="text-xl font-bold mb-2">Products Matching Name</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.productsMatchingName?.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                      <img className="w-full h-64 object-cover" src={product.imageUrl} alt={product.name} />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1 text-black">{product.name}</h3>
                        <div className="flex items-center text-red-500">
                          <MdStar className="text-red-500" size={20} />
                          <span className="ml-1 text-gray-500">{product.rating}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                            <h4 className="font-semibold text-md mb-1 text-black">Category: </h4>
                            <p className="text-md">{product.category}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-2">Products Matching Category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.productsMatchingCategory?.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                      <img className="w-full h-64 object-cover" src={product.imageUrl} alt={product.name} />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1 text-black">{product.name}</h3>
                        <div className="flex items-center text-red-500">
                          <MdStar className="text-red-500" size={20} />
                          <span className="ml-1 text-gray-500">{product.rating}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                            <h4 className="font-semibold text-md mb-1 text-black">Category: </h4>
                            <p className="text-md">{product.category}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
    );
}

export default AdvancedSearchPage;