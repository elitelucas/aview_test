
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
import { AuthContext } from '../../../store/auth.js';
// core components
// import AuthHeader from "components/Headers/AuthHeader.js";
import MenuHeader from "components/Headers/MenuHeader.js";

function BulkLoadingFail({response}) {
    const { logout } = useContext(AuthContext);
    return (
        <>
            <MenuHeader
                title="Failed loading"
            />
            <Container className=" px-2 px-lg-8 pb-5" style={{ marginTop: '-5rem' }}>
                {/* <Row className="justify-content-center">
                    <Col lg="6" className="text-center">
                        <h1>Single Loading Success</h1>
                    </Col>
                </Row> */}
                <Card className="card-pricing bg-gradient-default  mx-4  zoom-out shadow rounded border-0  mb-1 ">
                    <CardBody>
                        <div className="my-3">
                            <p className="text-white">
                                <strong>Document corrupt</strong>                              
                            </p>
                            <p className="text-white">
                                Please check document format and fix before attempting any other popup
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

export default BulkLoadingFail;
