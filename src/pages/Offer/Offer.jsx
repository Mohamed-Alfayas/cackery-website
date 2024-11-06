import OfferVector from "../../assets/images/Offers/offerVector.png";
import CakeOfferCard from "../../component/common/Category/CakeOfferCard";
import { Grid, Skeleton } from "@mui/material";
import Banner from "../banner/Banner";
import { DataContext } from "../../context/DataContext";
import { useContext, useEffect, useState } from "react";
import { getOfferItemsApi } from "../../utils/cakeryAPI";

const Offer = () => {
  
  const { initPageOffer, setInitPageOffer, offeredItemsObj, setOfferedItemsObj } = useContext(DataContext)

  useEffect(() => {
    if (initPageOffer) {
      getOfferList();
      setInitPageOffer(false)
    }
  }, [])

  const getOfferList = async () => {
    try {
      const getOfferAPIResponse = await getOfferItemsApi();
      setOfferedItemsObj(getOfferAPIResponse?.data);
    } catch (error) {
      console.error(error);
    } finally {
      // setIsPreloaderShow(false);
    }
  };

  return (
    <div>
      <Banner />

      <div>
        <div className="align-middle mt-8">
          <h2 className="font-poppins font-semibold text-lg text-center">
            Offer Title
          </h2>
          <div className="flex justify-center">
            <img src={OfferVector} alt="Offer Vector" />
          </div>
          <p className="px-4 py-6 text-center">
            Description of the offer title you were placed. Discover the joy of
            our Classic Cakes, where timeless flavors delight your taste buds,
            and indulge in our Exquisite Custom Cakes, tailor-made masterpieces
            that create unforgettable memories.
          </p>

          <div>
            <Grid container spacing={2}>
              {offeredItemsObj?.length ? offeredItemsObj.map((offer, index) => {
                const imageUrl = offer?.cake?.images?.[0];
                const originalPrice = offer?.cake_actual_price || 0;
                const discountedPrice = offer?.cake_offer_price || 0;
                const discountedPercentage = parseFloat(offer?.offer?.offer_percentage).toFixed(0) || 0;
                // console.log(imageUrl)
                return (
                  <CakeOfferCard
                    key = {index}
                    column = {2.4}
                    image = {imageUrl}
                    discount = {discountedPercentage}
                    title = {offer?.cake?.name}
                    originalPrice = {originalPrice}
                    discountPrice = {discountedPrice}
                    id = {offer?.cake?.id}                    
                  />
                );
              }) : (
                Array.from({ length: 10 }).map((_, index) => (
                  <Grid item key={index} md={2.4} sm={6} xs={6}>
                    <Skeleton variant="rounded" animation="wave" height={"325px"} width={"100%"} />
                  </Grid>
                ))
             )}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
