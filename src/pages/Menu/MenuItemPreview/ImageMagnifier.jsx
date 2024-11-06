import React, { useState } from 'react';
import './ImageMagnifier.scss'; // You will create this CSS file
import PropTypes from "prop-types";

const ImageMagnifier = ({ src, alt, zoom = 2, className }) => {
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = () => {
    setIsMagnifying(true);
  };

  const handleMouseLeave = () => {
    setIsMagnifying(false);
  };

  const handleMouseMove = (e) => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    setMousePosition({
      top: mouseY,
      left: mouseX,
      xPercent: (mouseX / width) * 100,
      yPercent: (mouseY / height) * 100,
    });
  };

  return (
    <div
      className="image-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img src={src} alt={alt} className={`image ${className}`} />
      {isMagnifying && (
        <div
          className={`magnifier`}
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${mousePosition.xPercent}% ${mousePosition.yPercent}%`,
            backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
            top: mousePosition.top - 50,
            left: mousePosition.left - 50,
          }}
        />
      )}
    </div>
  );
};

ImageMagnifier.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    zoom: PropTypes.string,
    className: PropTypes.string,
  };

export default ImageMagnifier;
