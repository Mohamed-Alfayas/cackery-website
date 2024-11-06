// import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./CakeOfferCard.scss";

const CakeOfferCard = ({
  image,
  discount,
  title,
  discountPrice,
  originalPrice,
  id,
  column,
}) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/menu/${id}`);
  };

  return (
    <Grid
      item
      lg={column}
      md={4}
      sm={6}
      xs={6}
      style={{ cursor: "pointer" }}
      onClick={(e) => handleImageClick(e)}
    >
      <div className="rounded-xl overflow-auto cake-offer-card">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="cake-image w-full object-cover"
          />
          {discount !== undefined && discount !== 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="bg-slate-50 text-center cake-price-section">
          <h3 className="text-gray-900 font-semibold text-sm mb-2">{title}</h3>
          <div className="flex justify-center align-items-center">
            <span className="text-red-500 font-bold text-center">
              <span className="rs-font">₹</span>
              {discountPrice}
            </span>
            {discount !== undefined && discount !== 0 && originalPrice && (
              <span className="text-gray-500 text-sm line-through ml-2 text-center">
                <span className="rs-font">₹</span>
                {originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default CakeOfferCard;

CakeOfferCard.propTypes = {
  image: PropTypes.string,
  discount: PropTypes.string,
  title: PropTypes.string,
  discountPrice: PropTypes.string,
  originalPrice: PropTypes.string,
  column: PropTypes.number,
  id: PropTypes.number.isRequired,
};
