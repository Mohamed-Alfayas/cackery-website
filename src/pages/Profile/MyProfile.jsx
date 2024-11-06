import { Avatar, Box, Button, Checkbox, Grid, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Card } from 'react-bootstrap'
import { DataContext } from '../../context/DataContext';
import "./Profile.scss";
import { createAddressApi, getAddressApi, updateProfileApi } from '../../utils/cakeryAPI';
import PropTypes from "prop-types";
import ProfileCard from './Profile';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const MyProfile = () => {
    const { setIsPreloaderShow, userProfileInfo, customerAddressObj, setCustomerAddressObj } = useContext(DataContext);

    /*  */

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /* Address Edit */

    useEffect(() => {
        fetchAddresses();
    }, []);

    const initialData = useMemo(() => ({
        id: 0,
        title: "",
        address: "",
        city: "",
        pincode: "",
    }), []);

    const fetchAddresses = async () => {
        try {
            const response = await getAddressApi();
            setCustomerAddressObj(response?.data || []);
        } catch (error) {
            console.error(error);
        }
    };


    const [addressData, setAddressData] = useState(initialData)
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editAddressId, setEditAddressId] = useState(null);
    const [selectedAddressID, setSelectedAddressID] = useState(null);
    const [errors, setErrors] = useState({});
    const [addressErrors, setAddressErrors] = useState({});
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleSelectAddress = (address) => {
        setSelectedAddressID(address?.id);
        setSelectedAddress(address);
        setShowAddressForm(false);
    };

    const handleAddAddress = async () => {
        const requiredFields = ["title", "address", "city", "pincode"];
        const newErrors = {};

        requiredFields.forEach((field) => {
            if (!addressData[field]) {
                newErrors[field] = "This field is required";
            }
        });

        setAddressErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            let requestData = {
                id: editAddressId || 0,
                is_primary: false,
                ...addressData,
            };

            try {
                setIsPreloaderShow(true)
                const createAddressApiResponse = await createAddressApi(requestData);
                setEditAddressId(null);
                setAddressData(initialData);
                setIsAddressEdit(false);
                await fetchAddresses();
            } catch (error) {
                console.error(error);
            } finally{
                setIsPreloaderShow(false)
            }
        }
    };

    const handleEditAddress = (address) => {
        setIsAddressEdit(true);
        setShowAddressForm(true);
        setAddressData(address);
        setEditAddressId(address.id);
    };

    const handleAddressInputChange = (e) => {
        const { name, value } = e.target;
        setAddressData((prevData) => {
            const newAddressData = { ...prevData, [name]: value };
            validateAddressField(name, value);
            return newAddressData;
        });
    };

    const validateAddressField = (name, value) => {
        let error = "";

        if (!value) {
            error = "This field is required";
        }
        setAddressErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const [selectedDeliveryAddressID, setSelectedDeliveryAddressID] = useState(null);
    const [isAddressEdit, setIsAddressEdit] = useState(false);

    return (
        <div className='profile-section-page'>

            <Grid container spacing={2}>
                <Grid item md={4}>
                    <Card className='p-2 mb-3 profile-short'>
                        <Avatar
                            alt={userProfileInfo?.name}
                            src={userProfileInfo?.profile_url}
                            sx={{ bgcolor: "#e91e63", width: 50, height: 50 }}
                        />
                        <div>
                            <span>Hello,</span>
                            <p className='name'>{userProfileInfo?.name}</p>
                        </div>
                    </Card>
                    <Card className='profile-side-navs'>
                        <Tabs orientation="vertical"
                            value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab className="item" label="My Profile" {...a11yProps(0)} />
                            <Tab className="item" label="Manage Address" {...a11yProps(1)} />
                            <Tab className="item" label="My Orders" {...a11yProps(2)} />
                            <Tab className="item" label="My Reviews and Ratings" {...a11yProps(3)} />
                        </Tabs>
                    </Card>

                </Grid>
                <Grid item md={8}>
                    <CustomTabPanel value={value} index={0}>
                        <ProfileCard />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Card className='mb-3 manage-address'>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="left"
                                sx={{ px: 0 }}
                            >
                                <Card.Header>Manage Address
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        style={{ textTransform: "capitalize" }}
                                        onClick={() => {
                                            setAddressData(initialData);
                                            setIsAddressEdit(true);
                                            setSelectedDeliveryAddressID(null)
                                        }}
                                    >
                                        Add Address
                                    </Button>
                                </Card.Header>
                                <Card.Body>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12}>
                                            <div className="addressList">
                                                {customerAddressObj?.map((address, index) => (
                                                    <div
                                                        key={index}
                                                        className={`addresCard p-2 m-0 ${selectedAddressID === address?.id ? "selected-address" : ""}`}
                                                    >
                                                        <Grid container spacing={2}
                                                            onClick={() => {
                                                                setIsAddressEdit(false);
                                                                setSelectedDeliveryAddressID(address?.id)
                                                            }}
                                                        >
                                                            <Grid item sm={1}>
                                                                <div>
                                                                    <Checkbox size="small" checked={selectedDeliveryAddressID === address?.id} />
                                                                </div>
                                                            </Grid>
                                                            <Grid item sm={11}>
                                                                <div>
                                                                    <p className="title"><b style={{ color: "#ff1e54" }}>{address?.title}</b></p>
                                                                    <p style={{ fontSize: "14px" }}>{address?.address}</p>
                                                                    <p style={{ fontSize: "14px" }}><b>City:</b> {address?.city}
                                                                        {address?.pincode && (<><b></b> - {address?.pincode}</>)}</p>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={1}></Grid>
                                                            <Grid item sm={11}>
                                                                {(selectedDeliveryAddressID === address?.id && !isAddressEdit) && (
                                                                    <div className="my-2 d-flex justify-content-end">
                                                                        <Button
                                                                            variant="contained"
                                                                            size="small"
                                                                            color="success"
                                                                            style={{ textTransform: "capitalize" }}
                                                                            onClick={() => handleEditAddress(address)}
                                                                        >
                                                                            Edit Address
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                                {((selectedDeliveryAddressID === address?.id) && isAddressEdit) && (
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={12}>
                                                                            <Typography variant="caption">Title</Typography>
                                                                            <TextField
                                                                                fullWidth
                                                                                placeholder="e.g., Home"
                                                                                size="small"
                                                                                name="title"
                                                                                value={addressData?.title || ""}
                                                                                onChange={handleAddressInputChange}
                                                                                error={Boolean(addressErrors?.title)}
                                                                                helperText={addressErrors?.title}
                                                                                required
                                                                            />
                                                                        </Grid>
                                                                        <Grid item md={6}>
                                                                            <Typography variant="caption">Address</Typography>
                                                                            <TextField
                                                                                fullWidth
                                                                                size="small"
                                                                                name="address"
                                                                                multiline
                                                                                rows={4}
                                                                                value={addressData?.address}
                                                                                onChange={handleAddressInputChange}
                                                                                error={Boolean(addressErrors?.address)}
                                                                                helperText={addressErrors?.address}
                                                                                required
                                                                            />
                                                                        </Grid>
                                                                        <Grid item md={6}>
                                                                            <div>
                                                                                <Typography variant="caption">City</Typography>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    size="small"
                                                                                    name="city"
                                                                                    value={addressData?.city}
                                                                                    onChange={handleAddressInputChange}
                                                                                    error={Boolean(addressErrors?.city)}
                                                                                    helperText={addressErrors?.city}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <Typography variant="caption">Pincode</Typography>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    size="small"
                                                                                    name="pincode"
                                                                                    value={addressData?.pincode}
                                                                                    onChange={handleAddressInputChange}
                                                                                    error={Boolean(addressErrors?.pincode)}
                                                                                    helperText={addressErrors?.pincode}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid item md={12} className="text-end">
                                                                            <Button
                                                                                variant="contained"
                                                                                size="small"
                                                                                color="error"
                                                                                className="me-2"
                                                                                onClick={() => {
                                                                                    // setShowAddressForm(false)
                                                                                    setIsAddressEdit(false);
                                                                                }}
                                                                            >
                                                                                Close
                                                                            </Button>

                                                                            <Button
                                                                                variant="contained"
                                                                                size="small"
                                                                                color="success"
                                                                                onClick={handleAddAddress}
                                                                            >
                                                                                {isAddressEdit ? "Update" : "Add"}
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                )}
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                ))}

                                                {(!selectedDeliveryAddressID && isAddressEdit) && (
                                                    <Grid container spacing={2}>
                                                        <Grid item md={12}>
                                                            <Typography variant="caption">Title</Typography>
                                                            <TextField
                                                                fullWidth
                                                                placeholder="e.g., Home"
                                                                size="small"
                                                                name="title"
                                                                value={addressData?.title || ""}
                                                                onChange={handleAddressInputChange}
                                                                error={Boolean(addressErrors?.title)}
                                                                helperText={addressErrors?.title}
                                                                required
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <Typography variant="caption">Address</Typography>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                name="address"
                                                                multiline
                                                                rows={4}
                                                                value={addressData?.address}
                                                                onChange={handleAddressInputChange}
                                                                error={Boolean(addressErrors?.address)}
                                                                helperText={addressErrors?.address}
                                                                required
                                                            />
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <div>
                                                                <Typography variant="caption">City</Typography>
                                                                <TextField
                                                                    fullWidth
                                                                    size="small"
                                                                    name="city"
                                                                    value={addressData?.city}
                                                                    onChange={handleAddressInputChange}
                                                                    error={Boolean(addressErrors?.city)}
                                                                    helperText={addressErrors?.city}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="mt-2">
                                                                <Typography variant="caption">Pincode</Typography>
                                                                <TextField
                                                                    fullWidth
                                                                    size="small"
                                                                    name="pincode"
                                                                    value={addressData?.pincode}
                                                                    onChange={handleAddressInputChange}
                                                                    error={Boolean(addressErrors?.pincode)}
                                                                    helperText={addressErrors?.pincode}
                                                                    required
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item md={12} className="text-end">
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                color="error"
                                                                className="me-2"
                                                                onClick={() => {
                                                                    // setShowAddressForm(false)
                                                                    setIsAddressEdit(false);
                                                                }}
                                                            >
                                                                Close
                                                            </Button>

                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                color="success"
                                                                onClick={handleAddAddress}
                                                            >
                                                                {isAddressEdit ? "Update" : "Add"}
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                )}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Card.Body>
                            </Box>
                        </Card>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Card className='mb-3 my-orders-main'>
                            <Card.Header>My Orders</Card.Header>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="left"
                                sx={{ p: 2 }}
                            >
                            </Box>
                        </Card>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Card className='mb-3 my-reviews-main'>
                            <Card.Header>My Reviews</Card.Header>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="left"
                                sx={{ p: 2 }}
                            >
                            </Box>
                        </Card>
                    </CustomTabPanel>
                </Grid>
            </Grid>
        </div>
    )
}

export default MyProfile