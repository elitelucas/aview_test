/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";
// core components
// import AuthHeader from "components/Headers/AuthHeader.js";
import MenuHeader from "components/Headers/MenuHeader.js";

import { AuthContext } from '../../../store/auth.js';

function SingleLoadingSuccess({response}) {
    // const response = JSON.parse(localStorage.getItem('SLResponse'));
    // console.log('SingleLoadingSuccess =>', response.status);
    const { logout } = useContext(AuthContext);
    return (
        <>
            <MenuHeader
                title="Successful loading"
            />
            <Container className="mt--8 px-2 px-lg-8 pb-5">
                {/* <Row className="justify-content-center">
                    <Col lg="6" className="text-center">
                        <h1>Single Loading Success</h1>
                    </Col>
                </Row> */}
                <Card className="card-pricing bg-gradient-default  mx-4  zoom-out shadow rounded border-0  mb-1 ">
                    <CardBody>
                        <div className="my-3">
                            <p className="text-white">
                                <strong>Product Name & Amount:</strong> {response.type} {response.amount}
                                {/* MTN Airtime R10.00 */}
                            </p>
                            <p className="text-white">
                                <strong>Vendor Reference:</strong> {response.vendorReference}
                                {/* 00000000000 */}
                            </p>
                            <p className="text-white">
                                <strong>Reference:</strong> {response.reference}
                                {/* 00000000000 */}
                            </p>                        
                            <p className="text-white">
                                <strong>Mobile Number:</strong> {response.mobileNumber}
                                {/* 083 123 4567 */}
                            </p>
                            <p className="text-white">
                                <strong>Tx Date & Time:</strong> {response.dateTime}
                                {/* yyyy/mm/dd/hr:min */}
                            </p>                        
                            <p className="text-white">
                                <strong>UniqID internal:</strong> {response.requestId}
                                {/* (unique ID generated from database for record) */}
                            </p>                        
                        </div>
                    </CardBody>
                </Card>
            </Container>
            <Container className="text-center pb-5">
                <Button
                    className="btn-neutral"
                    color="default"
                    onClick={() => logout()}
                >
                    Logout
                </Button>
            </Container>
        </>
    );
}

export default SingleLoadingSuccess;
