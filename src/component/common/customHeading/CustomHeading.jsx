
import "./CustomHeading.scss";
import curve from "../../../assets/icons/underline-curve.svg";
import PropTypes from 'prop-types';

const CustomHeading = ({ title, titleClassName, imgClassName }) => {
  return (
    <>
      <h4 className={titleClassName || ""}>{title || ""}</h4>
      <img src={curve} alt="" className={imgClassName || ""} />
    </>
  );
};
CustomHeading.propTypes = {
  title: PropTypes.string.isRequired,
  titleClassName: PropTypes.string,
  imgClassName: PropTypes.string,
};
export default CustomHeading;
