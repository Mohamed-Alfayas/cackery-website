import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductSlider.scss'
import { Button } from '@mui/material';
import { DataContext } from '../../context/DataContext';
import { useNavigate } from 'react-router';

const ProductSlider = () => {

    const favouriteSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    let desc = "Our tender coconut cake is crafted with fresh coconut flakes, velvety cake layers, and a hint of tropical sweetness, creating a blissful dessert that delights the palate.";

    const { offeredItemsObj } = useContext(DataContext);

    const navigate = useNavigate();

    return (
        <div className='product-slider-section'>
            <Container key={0}> 
                <Slider {...favouriteSettings} className="slider">
                    {offeredItemsObj?.map((data, index) => {
                        return (
                            <div key={index} className="slider-item">
                                <div className="image-top">
                                    <div className="image-favorite">
                                        <img src={data?.cake?.images?.[0]} />
                                    </div>
                                    <span>
                                        <small className="rs-font">₹</small>{data?.cake_offer_price}
                                    </span>
                                </div>
                                <div className="card-info">
                                    <h4 className="name">{data?.cake?.name} {" - "}{data?.kg?.kg}{" Kg"}</h4>
                                    <h4 className="sub-category">{data?.cake?.sub_category?.name}</h4>
                                    <p className="desc">{data?.desc || desc}</p>
                                    <div className="text-end">
                                        <Button variant="contained" className="add-cart-button" onClick={() => {
                                            navigate(`/menu/${data?.cake?.id}`);
                                        }}>
                                            <FontAwesomeIcon
                                                icon={faBagShopping}
                                                className="me-2"
                                            />
                                            Go to Menu
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </Container>
        </div>
    )
}

export default ProductSlider
