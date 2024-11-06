import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

const OfferCard = ({ image, discount, title, price, originalPrice, column }) => {
  return (
    <Grid item md={column} sm={6} xs={6}>
      <div className="rounded-xl overflow-auto">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-50 object-cover" />
          {discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
              {discount} OFF
            </div>
          )}
        </div>
        <div className="p-4 bg-slate-50 text-center" style={{cursor: "pointer"}}>
          <h3 className="text-gray-900 font-semibold text-sm mb-2">{title}</h3>
          <div className="flex justify-center">
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
    </Grid>
  );
};

export default OfferCard;

OfferCard.propTypes = {
  image: PropTypes.string,
  discount: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  originalPrice: PropTypes.string,
  column: PropTypes.number
};
