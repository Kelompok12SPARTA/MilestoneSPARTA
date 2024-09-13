'use client';

import { useState, useEffect } from "react";
import { FoodCard } from "@/components/foodcard";
import SearchBar from "@/components/searchbar";
import { Restaurant } from "@/types/components";
import { useLocation } from "@/utils/LocationContext";
import { fetchPlaceCoordinates } from "@/utils/mapUtils"; // Import the function here

interface SearchProps {
  restaurants: Restaurant[];
  type?: 'recommended' | 'leaderboard' | 'default';
  isNearMePage?: boolean; // New prop to identify if it's the "Near Me" page
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Return distance in kilometers
};

const extractPlaceId = (url: string): string | null => {
  const match = url.match(/place_id:([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

function Search({ restaurants, type: initialType, isNearMePage = false }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination  
  const [maxDistance, setMaxDistance] = useState(3); // Max distance in km
  const [type, setType] = useState<'recommended' | 'leaderboard' | 'default'>(initialType || 'default');
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]); // State to hold restaurants with distance
  const totalItemsPerPage = 12; // Total items per page
  const { location } = useLocation(); // User's location

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

  useEffect(() => {
    // Function to fetch and calculate distances for restaurants
    const fetchRestaurantData = async () => {
      const updatedRestaurants = await Promise.all(
        restaurants.map(async (restaurant) => {
          const placeId = extractPlaceId(restaurant.link || "");
          if (placeId) {
            const coords = await fetchPlaceCoordinates(placeId);
            if (coords && location.coords) {
              const distance = calculateDistance(
                location.coords.latitude,
                location.coords.longitude,
                coords.latitude,
                coords.longitude
              );
              return { ...restaurant, distance };
            }
          }
          return { ...restaurant, distance: null };
        })
      );

      setRestaurantData(updatedRestaurants);
    };

    fetchRestaurantData();
  }, [restaurants, location]);

  // Apply distance filter only if on the "Near Me" page
  const filteredRestaurants = isNearMePage
    ? restaurantData
        .filter(restaurant => restaurant.distance !== null && restaurant.distance <= maxDistance) // Filter based on max distance
        .filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0)) // Sort by distance (closest first)
    : restaurantData
        .filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())) // Only filter by search term
        .sort(() => Math.random() - 0.5); // Randomize order if on the homepage

  const indexOfLastItem = currentPage * totalItemsPerPage; // Index of last item
  const indexOfFirstItem = indexOfLastItem - totalItemsPerPage; // Index of first item
  const currentItems = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem); // Current items to display

  const totalPages = Math.ceil(filteredRestaurants.length / totalItemsPerPage); // Total pages

  const gridColumnsClass = type === 'recommended' ? "grid-cols-3" : type === "leaderboard" ? "grid-cols-1" : "grid-cols-2"; // Conditional grid columns

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> {/* Pass state and updater */}
      
      {/* Max Distance Filter (only show this on the Near Me page) */}
      {isNearMePage && (
        <div className="my-4 w-full flex flex-col">
          <label htmlFor="maxDistance" className="text-black">
            Max Distance: {maxDistance} km
          </label>
          <input
            id="maxDistance"
            type="range"
            min="1"
            max="3"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-[240px] bg-black"
          />
        </div>
      )}

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
          >
            Previous
          </button>

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
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Search;
