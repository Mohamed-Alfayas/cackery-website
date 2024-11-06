import React, { useContext, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Orders.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from '../../context/DataContext';
import { orderFormatDate } from '../../utils/CommonFunctions';
import { orderStatus } from '../../utils/Constant';
import { orderCancelRequest } from '../../utils/cakeryAPI';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    price: {
      main: '#FF1E54',
    },
  },
});

const MyOrders = () => {

  const { myOrdersList, setMyOrdersList, GetMyOrders, setIsPreloaderShow} = useContext(DataContext);

  useEffect(() => {
    const fetchOrders = async () => {
      await GetMyOrders();
    };
    setMyOrdersList(null)
    fetchOrders();
  }, []);

  const handleOrderCancelRequest = async (orderID) => {
    try {
      setIsPreloaderShow(true)
      let requestData = {
        "cake_order_id": orderID,
        "delivery_status": 7   
      }
      const orderCancelRequestResponse = await orderCancelRequest(requestData);
      await GetMyOrders();
    } catch (error) {
      console.error(error)
    } finally {
      setIsPreloaderShow(false)
    }
  }

  

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h6" className="cart-order-title">
        Orders
      </Typography>
      <div>
        {myOrdersList?.length > 0 ? (
          myOrdersList?.map((order, index) => (
            <Box className="cart-order" key={index}>
              <Box display="flex" alignItems="center">
                <img
                  src={order?.cart_items?.[0]?.cake?.images_list?.[0]?.url}
                  className="order-cake-image"
                  alt="order-cake"
                />
                <Box>
                  <Typography variant="h6" className="cake-name">
                    {order?.cart_items?.[0]?.cake?.name}
                  </Typography>
                  <Typography variant="body2" className="cake-price">
                    <span className="rs-font">₹</span>{order?.cart_items?.[0]?.price}/{order?.cart_items?.[0]?.cake_price?.kg?.kg}{"Kg"} * {order?.cart_items?.[0]?.qty} Qty
                  </Typography>
                  <Typography variant="body2" className="cake-event-date">
                    Event Date: {orderFormatDate(order?.cart_items?.[0]?.created_on)}
                  </Typography>
                  {/* <Typography variant="body2" className="cake-event-date">
                    Order Time: {orderFormatDate(order?.order_time)}
                  </Typography> */}
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                {orderStatus[order?.delivery_status]}
                {[1, 2, 3].includes(order?.delivery_status) && (
                  <Button variant="outlined" className="order-button order-cancel" onClick={()=>{
                    handleOrderCancelRequest(order?.id)
                  }}>
                    Cancel Order
                  </Button>
                )}
                {/* {[7].includes(order?.delivery_status) && (
                  <Button
                    variant="contained"
                    className="order-button order-cancel-request"
                  >
                    Cancel Requested
                  </Button>
                )} */}
                {[5].includes(order?.delivery_status) && (
                  <Button
                    variant="contained"
                    className="order-button order-rate-review"
                  >
                    <FontAwesomeIcon icon={faStar} /> Rate & Review
                  </Button>
                )}
              </Box>
            </Box>
          ))
        ) : (
          <Box className="cart-order order-no-items" display="flex" alignItems="center" justifyContent="center" height="100px">
            <Typography className="rs-font">
              No orders
            </Typography>
          </Box>
        )}
      </div>

    </ThemeProvider>
  );
};

export default MyOrders;
