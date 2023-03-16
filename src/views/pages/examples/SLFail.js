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
import AuthHeader from "components/Headers/AuthHeader.js";
import MenuHeader from "components/Headers/MenuHeader.js";

function SingleLoadingFail({response}) {
    return (
        <>
            <MenuHeader
                title="Failed loading"
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
                                <strong>Error:</strong> {response.error}
                                {/* Internal Server Error                                 */}
                            </p>
                            <p className="text-white">
                                <strong>Error message:</strong> {response.message}
                                {/* Supplier offline, please retry */}
                            </p>
                            <p className="text-white">
                                <strong>Mobile Number:</strong> {}
                                {/* 083 123 4567 */}
                            </p>
                            <p className="text-white">
                                <strong>Tx Date & Time:</strong> {}
                                {/* yyyy-mm-dd hh:mm:ss */}
                            </p>                        
                            <p className="text-white">
                                <strong>UniqID internal:</strong>  {}
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
                    tag={Link}
                    to="/auth/login"
                >
                    Logout
                </Button>
            </Container>
        </>
    );
}

export default SingleLoadingFail;
