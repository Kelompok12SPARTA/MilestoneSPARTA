'use client';

import { useState, useEffect } from "react";
import { FoodCard } from "@/components/foodcard";
import SearchBar from "@/components/searchbar";
import { Restaurant } from "@/types/components";

interface SearchProps {
  restaurants: Restaurant[];
  type?: 'recommended' | 'leaderboard' | 'default';
}

function Search({ restaurants, type: initialType }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination  
  const [type, setType] = useState<'recommended' | 'leaderboard' | 'default'>(initialType || 'default');
  const totalItemsPerPage = 12; // Total items per page

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.matchMedia("(max-width: 640px)").matches; // Tailwind's sm breakpoint (640px)
      if (isSmallScreen) {
        setType('leaderboard');
      } else {
        setType(initialType || 'default');
      }
    };

    handleResize(); // Call once to set initial state
    window.addEventListener('resize', handleResize); // Listen for resize events

    return () => window.removeEventListener('resize', handleResize); // Cleanup listener on component unmount
  }, [initialType]);


  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter based on search input

  const indexOfLastItem = currentPage * totalItemsPerPage; // Index of last item
  const indexOfFirstItem = indexOfLastItem - totalItemsPerPage; // Index of first item
  const currentItems = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem); // Current items to display

  const totalPages = Math.ceil(filteredRestaurants.length / totalItemsPerPage); // Total pages

  const gridColumnsClass = type === 'recommended' ? "grid-cols-3" : type === "leaderboard" ? "grid-cols-1" : "grid-cols-2"; // Conditional grid columns

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  };
  
  return (
    <>
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> {/* Pass state and updater */}
      <div className={`grid ${gridColumnsClass} gap-4 gap-y-6 mt-12`}>
        {currentItems.map((restaurant) => (
          <FoodCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      {filteredRestaurants.length > totalItemsPerPage && (
        <div className="flex w-full justify-between items-center mt-4">
          <button 
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-100"
          >Previous
          </button>

          {/* Page Indicator Dots */}
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentPage === index + 1 ? 'bg-black' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>

          <button 
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-100"
          >Next
          </button>
        </div>
      )}
    </>
  );
}

export default Search;
