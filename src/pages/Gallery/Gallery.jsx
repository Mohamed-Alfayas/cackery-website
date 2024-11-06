import React from "react";
import "./Gallery.scss";
import { ImageList, ImageListItem, Button, useMediaQuery, Grid, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { getGalleryListApi } from "../../utils/cakeryAPI";

const Gallery = () => {
  const { setIsPreloaderShow, galleryImageObj, setGalleryImageObj, initPageGallery, setInitPageGallery } = useContext(DataContext);

  useEffect(() => {
    if (initPageGallery) {
      getGalleryList();
      setInitPageGallery(false)
    }
  }, [])

  const getGalleryList = async () => {
    try {
      // setIsPreloaderShow(true);
      const getGalleryListApiResponse = await getGalleryListApi();
      setGalleryImageObj(getGalleryListApiResponse?.data)
    } catch (error) {
      console.error(error)
    } finally {
      // setIsPreloaderShow(false);
    }
  };


  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    if (isLg) return 4;
    return 5;
  };

  return (
    <div className="conatiner gallery-section">


      <div className="image-grid">
        <ImageList variant="masonry" cols={getCols()} gap={8}>
          {galleryImageObj?.length ? galleryImageObj?.map((image, index) => (
            <ImageListItem
              key={index}
              cols={image.cols || 1}
              rows={image.rows || 1}
            >
              <img
                src={image.image_url}
                alt={`Gallery ${index}`}
                className={`gallery-image gallery-image-${index}`}
                loading="lazy"
              />
            </ImageListItem>
          )) :
            (
              Array.from({ length: 10 }).map((_, index) => (
                <ImageListItem
                  key={index}
                  cols={5}
                  rows={2}
                >
                  <Skeleton variant="rounded" animation="wave" height={"305px"} width={"100%"} />
                </ImageListItem>
              ))
            )}
        </ImageList>
      </div>
      <div className="text-center my-5">
        <Button variant="contained" className="theme-button">
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Gallery;
