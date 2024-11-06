import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap'
import './AddOnGift.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCircleXmark, faClose } from '@fortawesome/free-solid-svg-icons';

const AddOnGift = () => {
    const [giftObj, setGiftObj] = useState([
        {
            id: 1,
            name: "Tender Coonut Cake",
            price: 100,
            image: "https://mahilshe-project.s3.amazonaws.com/cakery/cake/1/954f7155-4f20-41c4-947f-9e73dd5ad0fd.jpg",
            is_added: true
        },
        {
            id: 2,
            name: "Tender Coonut Cake",
            price: 100,
            image: "https://mahilshe-project.s3.amazonaws.com/cakery/cake/1/954f7155-4f20-41c4-947f-9e73dd5ad0fd.jpg",
        },
        {
            id: 3,
            name: "Tender Coonut Cake",
            price: 100,
            image: "https://mahilshe-project.s3.amazonaws.com/cakery/cake/1/954f7155-4f20-41c4-947f-9e73dd5ad0fd.jpg",
        },
        {
            id: 4,
            name: "Tender Coonut Cake",
            price: 100,
            image: "https://mahilshe-project.s3.amazonaws.com/cakery/cake/1/954f7155-4f20-41c4-947f-9e73dd5ad0fd.jpg",
        },
        {
            id: 5,
            name: "Tender Coonut Cake",
            price: 100,
            image: "https://mahilshe-project.s3.amazonaws.com/cakery/cake/1/954f7155-4f20-41c4-947f-9e73dd5ad0fd.jpg",
        },
        {
            id: 6,
            name: "Tender Coonut Cake",
            price: 100,
            image: "https://mahilshe-project.s3.amazonaws.com/cakery/cake/1/954f7155-4f20-41c4-947f-9e73dd5ad0fd.jpg",
        },
        {
            id: 7,
            name: "Tender Coonut Cake",
            price: 100,
            image: "https://mahilshe-project.s3.amazonaws.com/cakery/cake/1/954f7155-4f20-41c4-947f-9e73dd5ad0fd.jpg",
        },
        {
            id: 8,
            name: "Tender Coonut Cake",
            price: 100,
            image: "https://mahilshe-project.s3.amazonaws.com/cakery/cake/1/954f7155-4f20-41c4-947f-9e73dd5ad0fd.jpg",
        },
        {
            id: 9,
            name: "Tender Coonut Cake",
            price: 100,
            image: "https://mahilshe-project.s3.amazonaws.com/cakery/cake/1/954f7155-4f20-41c4-947f-9e73dd5ad0fd.jpg",
        },
    ])

    return (
        <div className='add-on-gift-page'>
            <Tabs
                defaultActiveKey="popular"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="popular" title="Popular">
                    <Grid container spacing={2} >
                        {giftObj?.map((item, index) => (
                            <Grid item md={3} sm={4} xs={6} key={index} className='gift-item'>
                                <Card>
                                    <Card.Img variant="top" src={item?.image} />
                                    <Card.Body>
                                        <div>
                                            <p className='product-name'>{item?.name}</p>
                                            <p className='product-price'><span className="rs-font">₹</span>{item?.price}</p>
                                        </div>
                                        {item?.is_added ?
                                            (<Button variant="outlined" className="added-bag-btn"
                                                onClick={() => {
                                                }}>
                                                Added
                                                <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    className="ms-2"
                                                />
                                            </Button>) : (
                                                <Button variant="outlined" className="add-to-bag-btn"
                                                    onClick={() => {
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faBagShopping}
                                                        className="me-2"
                                                    />
                                                    Add to bag
                                                </Button>)}

                                    </Card.Body>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Tab>
                <Tab eventKey="cakes" title="Cakes">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="gifts" title="Gifts">
                    Tab content for Contact
                </Tab>
                <Tab eventKey="chocolates" title="Chocolates">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="sweets_dry_fruits" title="Sweets & Dry Fruits">
                    Tab content for Contact
                </Tab>
            </Tabs>
        </div>
    )
}

export default AddOnGift
