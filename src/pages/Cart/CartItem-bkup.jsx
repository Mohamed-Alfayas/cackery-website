import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import { GalleryVector } from '../Gallery/GalleryImages';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './CartItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h6" className="cart-order-title">
        Orders
      </Typography>
      <div>
        <Box className="cart-order">
          <Box display="flex" alignItems="center">
            <img
              src={GalleryVector}
              className="order-cake-image"
              alt="Chocolate Truffle"
            />
            <Box>
              <Typography variant="h6" className="cake-name">
                Chocolate Truffle
              </Typography>
              <Typography variant="body2" className="cake-price">
                ₹ 1450/Kg
              </Typography>
              <Typography variant="body2" className="cake-event-date">
                Event Date: 26 May
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Button variant="outlined" className="order-button order-cancelled">
              Cancelled
            </Button>
          </Box>
        </Box>

        <Box className="cart-order">
          <Box display="flex" alignItems="center">
            <img
              src={GalleryVector}
              className="order-cake-image"
              alt="Chocolate Truffle"
            />
            <Box>
              <Typography variant="h6" className="cake-name">
                Chocolate Truffle
              </Typography>
              <Typography variant="body2" className="cake-price">
                ₹ 1450/Kg
              </Typography>
              <Typography variant="body2" className="cake-event-date">
                Event Date: 26 May
              </Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Button variant="outlined" className="order-button order-placed">
              Order Placed
            </Button>
            <Button variant="outlined" className="order-button order-cancel">
              Cancel Order
            </Button>
          </Box>
        </Box>

        <Box className="cart-order">
          <Box display="flex" alignItems="center">
            <img
              src={GalleryVector}
              className="order-cake-image"
              alt="Chocolate Truffle"
            />
            <Box>
              <Typography variant="h6" className="cake-name">
                Chocolate Truffle
              </Typography>
              <Typography variant="body2" className="cake-price">
                ₹ 1450/Kg
              </Typography>
              <Typography variant="body2" className="cake-event-date">
                Event Date: 26 May
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Button variant="outlined" className="order-button order-confirmed">
              Confirmed
            </Button>
            <Button variant="outlined" className="order-button order-cancel">
              Cancel Order
            </Button>
          </Box>
        </Box>

        <Box className="cart-order">
          <Box display="flex" alignItems="center">
            <img
              src={GalleryVector}
              className="order-cake-image"
              alt="Chocolate Truffle"
            />
            <Box>
              <Typography variant="h6" className="cake-name">
                Chocolate Truffle
              </Typography>
              <Typography variant="body2" className="cake-price">
                ₹ 1450/Kg
              </Typography>
              <Typography variant="body2" className="cake-event-date">
                Event Date: 26 May
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Button variant="outlined" className="order-button order-ready">
              Ready
            </Button>
            <Button variant="outlined" className="order-button order-cancel">
              Cancel Order
            </Button>
          </Box>
        </Box>

        <Box className="cart-order">
          <Box display="flex" alignItems="center">
            <img
              src={GalleryVector}
              className="order-cake-image"
              alt="Chocolate Truffle"
            />
            <Box>
              <Typography variant="h6" className="cake-name">
                Chocolate Truffle
              </Typography>
              <Typography variant="body2" className="cake-price">
                ₹ 1450/Kg
              </Typography>
              <Typography variant="body2" className="cake-event-date">
                Event Date: 26 May
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Button variant="outlined" className="order-button order-delivered">
              Delivered
            </Button>
            <Button
              variant="contained"
              className="order-button order-rate-review"
            >
              <FontAwesomeIcon icon={faStar} className=''/>Rate & Review
            </Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default MyOrders;
