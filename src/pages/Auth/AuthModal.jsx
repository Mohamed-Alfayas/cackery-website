import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import PropTypes from "prop-types";
import './auth.scss';
import './LoginModal.scss';
import LoginContainer from "./LoginContainer";
import SignUpContainer from "./SignUpContainer";

function AuthModal({ show, setShow }) {
    const handleClose = () => setShow(false);

    const [isSignupPage, setIsSignupPage] = useState(false);

    return (
        <Modal show={show} onHide={handleClose} size="xl" centered>
            <Modal.Body closeButton className="px-4 py-5">
                {isSignupPage ?
                    (<SignUpContainer setIsSignupPage={setIsSignupPage} setShow={setShow} />) :
                    (<LoginContainer setIsSignupPage={setIsSignupPage}  setShow={setShow} />)
                }
            </Modal.Body>
        </Modal>
    );
}

AuthModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
};

export default AuthModal;