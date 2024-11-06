import React, { useContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import {
    TextField,
    Button,
    Typography,
    Box,
    Grid,
} from '@mui/material';
import './Profile.scss';
import { DataContext } from '../../context/DataContext';
import { updateProfileApi } from '../../utils/cakeryAPI';
import { Card } from 'react-bootstrap';

const ProfileCard = () => {

    const { setIsPreloaderShow, userProfileInfo, setUserProfileInfo } = useContext(DataContext);

    const [preview, setPreview] = useState("");

    const [profileDetails, setProfileDetails] = useState({
        id: null,
        name: null,
        image: null,
    });

    const handleOnchange = (value, name) => {
        console.log(name)
        if (name === "image") {
            setProfileDetails((oldData) => ({
                ...oldData,
                [name]: value,
            }));
            setPreview(URL.createObjectURL(value));
        } else {
            setProfileDetails((oldData) => ({
                ...oldData,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        setProfileDetails({
            id: userProfileInfo?.id,
            name: userProfileInfo?.name,
            image: null,
        })
        setPreview(userProfileInfo?.profile_url)
    }, [userProfileInfo])

    const handleUpdateProfile = async () => {
        try {
            setIsPreloaderShow(true);
            const formData = new FormData();
            if (profileDetails?.id) {
                formData.append("id", profileDetails?.id);
            }
            formData.append("name", profileDetails.name);

            if (profileDetails.image) {
                formData.append("image", profileDetails.image);
            }

            const updateProfileApiResponse = await updateProfileApi(formData);
            let responseData = updateProfileApiResponse?.data;
            setUserProfileInfo(responseData)
        } catch (error) {
            console.error(error);
        } finally {
            setIsPreloaderShow(false);
        }

    }


    return (
        <Card className='mb-3 profile-main'>
            <Card.Header>My Profile</Card.Header>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="left"
                sx={{ p: 2 }}
            >
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <Typography variant="caption">Name</Typography>
                        <TextField
                            // label="Name"
                            className='my-2'
                            value={userProfileInfo?.name}
                            fullWidth
                            size='small'
                            margin="normal"
                            onChange={(e) => {
                                handleOnchange(e.target.value, "name");
                            }}
                            InputProps={{
                                // readOnly: true,
                            }}
                        />
                        <Typography variant="caption">Email</Typography>
                        <TextField
                            // label="Email"
                            className='my-2'
                            value={userProfileInfo?.email}
                            fullWidth
                            size='small'
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <Typography variant="caption">Phone Number</Typography>
                        <TextField
                            // label="Pincode"
                            className='my-2'
                            value={userProfileInfo?.phone}
                            fullWidth
                            size='small'
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </Grid>
                    <Grid item md={4} className='profile-picture'>


                        {preview && (
                            <div className="mt-2">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "10px",
                                        marginBottom: "1rem",
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            style={{ width: "100%" }}
                            onChange={(e) => {
                                handleOnchange(e.target.files[0], "image");
                            }}
                        />
                        {/* <Avatar
                                    alt={userProfileInfo?.name}
                                    src={userProfileInfo?.profilePicture}
                                    sx={{ width: "150px", height: "150px", mb: 2, borderRadius: "5px" }}
                                /> */}
                    </Grid>
                    <Grid item md={12} className='text-end mb-2'>
                        <Button variant="contained" color="primary" className='profile-edit-update-btn'
                            onClick={() => {
                                handleUpdateProfile()
                            }}>
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

export default ProfileCard

