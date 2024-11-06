import React from "react";
import PropTypes from "prop-types";

const OfferCard = ({ image, discount, title, price, originalPrice }) => {
  return (
    <div className="w-[200px] bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
            {discount} OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 font-semibold text-sm mb-2">{title}</h3>
        <div className="flex">
          <span className="text-red-500 text-sm font-bold text-center">
            {price}
          </span>
          {originalPrice && (
            <span className="text-gray-500 text-sm line-through ml-2 text-center">
              {originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;

OfferCard.propTypes = {
  image: PropTypes.string,
  discount: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  originalPrice: PropTypes.string,
};
