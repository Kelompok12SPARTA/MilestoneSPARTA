import React from 'react';

interface FoodCardProps {
  image: string;
  title: string;
  location: string;
  range?: number;
  rating?: number;
  review?: string;
  type?: string;
  time?: string;
  onClick?: () => void;
  footer?: React.ReactNode;
}

const FoodCard: React.FC<FoodCardProps> = ({ image, title, location, rating, onClick, review, range, time, type }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-start border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white transition-transform duration-200 ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      }`}
    >
      {/* Gambar */}
      <div className="w-1/3">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Isi */}
      <div className="w-2/3 p-4">
        <h3 className="text-xl font-bold">{title} - {location}</h3>
        {rating && (
          <p className="text-yellow-500 mt-2">
            ⭐ {rating} <span className="text-gray-500">({review})</span>
          </p>
        )}
        <ul className="list-disc list-inside mt-4 text-gray-700">
          {range && time && (<li className="mt-2">{range} km → {time} mins</li>)}
          {type && (<li className="mt-2">{type}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default FoodCard;
