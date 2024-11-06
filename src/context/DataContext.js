import React, { createContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { getAddressApi, getOrderApi, getOverallCakeMenuList, getSubCategoryListApi, getOfferItemsApi, getConfiguration, getProfileApi } from '../utils/cakeryAPI';
import Cookies from 'universal-cookie';

// Create a Context
export const DataContext = createContext();

// Create a Provider component
export const DataProvider = ({ children }) => {

    const [isPreloaderShow, setIsPreloaderShow] = useState(false); // Initial state

    /* InitState Loader */
    const [initPageGallery, setInitPageGallery] = useState(true);
    const [initPageMenuList, setInitPageMenuList] = useState(true);
    const [initPageOffer, setInitPageOffer] = useState(true);

    /* End-InitState Loader  */
    const [data, setData] = useState({}); // Initial state
    const [customerAddressObj, setCustomerAddressObj] = useState([]);
    const [accessToken, setAccessToken] = useState('')

    const [menuListObj, setMenuListObj] = useState([]);

    const [cakeObj, setCakeObj] = useState([]);
    const [offeredItemsObj, setOfferedItemsObj] = useState([]);
    const [favouriteCakeObj, setFavouriteCakeObj] = useState([]);
    const [recommendedCakeObj, setRecommendedCakeObj] = useState([]);

    const [featuredCategoriesObj, setFeaturedCategoriesObj] = useState([]);
    const [mainCategoriesObj, setMainCategoriesObj] = useState([]);
    const [subCategoriesObj, setSubCategoriesObj] = useState([]);

    const [galleryImageObj, setGalleryImageObj] = useState([]);
    const [cakeListApi, setCakeListApi] = useState([]);
    const [offerApi, setOfferApi] = useState([]);
    const [myOrdersList, setMyOrdersList] = useState([]);

    const [userProfileInfo, setUserProfileInfo] = useState(null);

    const [configurationData, setConfigurationData] = useState(null);

    const getOverallCakeList = async () => {
        try {
            const getCakeAPIResponse = await getOverallCakeMenuList();
            setCakeObj(getCakeAPIResponse?.data)
        } catch (error) {
            console.error(error)
        } finally {
            console.log("Done")
        }
    }

    const getSubCategoryList = async () => {
        try {
            const getSubCategoryListApiResponse = await getSubCategoryListApi();
            setSubCategoriesObj(getSubCategoryListApiResponse?.data)
        } catch (error) {
            console.error(error)
        } finally {
            console.log("Done")
        }
    }

    const GetMyOrders = async () => {
        try {
            const getOrderApiResponse = await getOrderApi();
            setMyOrdersList(getOrderApiResponse?.data)
        } catch (error) {
            console.error(error)
        } finally {
            console.log("Done")
        }
    }
    const getUserProfile = async () => {
        try {
            const getProfileApiResponse = await getProfileApi();
            setUserProfileInfo(getProfileApiResponse?.data)
        } catch (error) {
            console.error(error)
        } finally {
            console.log("Done")
        }
    }

    const getAddressList = async () => {
        try {
            const getAddressApiResponse = await getAddressApi();
            setCustomerAddressObj(getAddressApiResponse?.data)
        } catch (error) {
            console.error(error);
        }
    };

    const getOfferList = async () => {
        try {
            const getOfferApiResponse = await getOfferItemsApi();
            setOfferedItemsObj(getOfferApiResponse?.data)
        } catch (error) {
            console.error(error);
        }
    };

    const getConfigurationList = async () => {
        try {
            const getConfigurationResponse = await getConfiguration();
            setConfigurationData(getConfigurationResponse?.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if ((new Cookies()).get('web_access_token')) {
            setAccessToken((new Cookies()).get('web_access_token'))
        }
    }, []);

    useEffect(() => {
        getOverallCakeList();
        getSubCategoryList();
        getOfferList();
        getConfigurationList();
    }, [])
  
    useEffect(() => {
        if (accessToken) {
            getUserProfile()
            getAddressList()
            GetMyOrders()
        }
    }, [accessToken])



    return (
        <DataContext.Provider value={{
            isPreloaderShow, setIsPreloaderShow,
            accessToken, setAccessToken,
            cakeObj, setCakeObj,
            subCategoriesObj, setSubCategoriesObj,
            galleryImageObj, setGalleryImageObj,
            cakeListApi, setCakeListApi,
            menuListObj, setMenuListObj,
            myOrdersList, setMyOrdersList,
            getAddressList,
            customerAddressObj, setCustomerAddressObj,
            initPageGallery, setInitPageGallery,
            initPageMenuList, setInitPageMenuList,
            initPageOffer, setInitPageOffer,
            getOfferList,
            offerApi, setOfferApi,
            offeredItemsObj, setOfferedItemsObj,
            configurationData,
            GetMyOrders,
            userProfileInfo,
            setUserProfileInfo,
            getUserProfile
        }}>
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
