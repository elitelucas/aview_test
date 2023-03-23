
import React, { useContext } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
    Card,
    CardImg,
    CardBody,
    Container,
    Row,
    Col,
    Button
} from "reactstrap";
// core components
import MenuHeader from "components/Headers/MenuHeader.js";

import { AuthContext } from '../../../store/auth.js';

function Welcome() {
    const { authState, logout } = useContext(AuthContext);
    const username = authState.userInfo?.username;
    // console.log('username =>', username);

    return (
        <>
            <MenuHeader
                title={`Welcome ${username}`}
            />
            <Container className="px-2 px-lg-8 pb-2" style={{ marginTop: '-10rem' }}>
                <Row className="justify-content-center">
                    <Col lg="6">
                        {/* <Card className="card-lift--hover shadow border-0"> */}
                        <Card className="card-profile shadow border-0">

                            <CardBody className="py-5">
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <img
                                        alt="..."
                                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                        src={require("assets/img/theme/download_avatar.jpg").default}
                                        style={{ width: "140px" }}
                                    />
                                </a>
                                <div className="text-center mt-4">
                                    <Button
                                        className="my-2"
                                        color="default"
                                        tag={Link}
                                        to="/auth/single-loading"
                                    >
                                        Single Loading
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6">
                        <Card className=" shadow border-0">
                            <CardBody className="py-5">
                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <img
                                        alt="..."
                                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                        src={require("assets/img/theme/images (1).png").default}
                                        style={{ width: "140px" }}
                                    />
                                </a>
                                <div className="text-center mt-4">
                                    <Button
                                        className="my-2"
                                        color="default"
                                        tag={Link}
                                        to="/auth/bulk-loading"
                                    >
                                        Bulk Loading
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="text-center pb-5">
                <Button
                    className="btn-neutral my-2"
                    color="default"
                    onClick={() => logout()}
                    // tag={Link}
                    // to="/auth/login"
                >
                    Logout
                </Button>
            </Container>
        </>
    );
}

export default Welcome;
