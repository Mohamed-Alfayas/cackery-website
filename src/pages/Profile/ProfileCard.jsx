// import React from 'react';
import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    IconButton,
    Typography,
    Box,
    Avatar
} from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import './ProfileCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = ({ open, onClose, user }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth className="profile-card">
            <DialogTitle>
                <Typography variant="h6" className='profile-text'>My Profile</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <FontAwesomeIcon icon={faClose} />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    sx={{ px: 2 }}
                >
                    <Avatar
                        alt={user.name}
                        src={user.profilePicture}
                        sx={{ width: 80, height: 80, mb: 2 }}
                    />
                    <Typography variant="caption">Name</Typography>
                    <TextField
                        // label="Name"
                        className='my-2'
                        value={user.name}
                        fullWidth
                        size='small'
                        margin="normal"
                        InputProps={{
                            // readOnly: true,
                        }}
                    />
                    <Typography variant="caption">Email</Typography>
                    <TextField
                        // label="Email"
                        className='my-2'
                        value={user.email}
                        fullWidth
                        size='small'
                        margin="normal"
                        InputProps={{
                            // readOnly: true,
                        }}
                    />
                  
                    <Typography variant="caption">Phone Number</Typography>
                    <TextField
                        // label="Pincode"
                        className='my-2'
                        value={user.phoneNumber}
                        fullWidth
                        size='small'
                        margin="normal"
                        InputProps={{
                            // readOnly: true,
                        }}
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 3 }} className='profile-edit-update-btn'>
                        Edit
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileCard


ProfileCard.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        profilePicture: PropTypes.string.isRequired,
    }),
};
