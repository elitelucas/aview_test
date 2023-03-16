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
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// reactstrap components
import { Container, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";

function MenuHeader({ title, lead }) {
    return (
        <>
            <div className="header bg-gradient-info py-8 py-lg-8 pt-4 pt-lg-2">
                <Container>
                    <div className="header-body  mb-7 d-flex ">
                        <UncontrolledDropdown nav className="">
                            <DropdownToggle className="nav-link" color="" tag="a">
                                <i className="ni ni-ui-04" />
                            </DropdownToggle>
                            <DropdownMenu
                                className="dropdown-menu-md dropdown-menu-dark bg-default"
                                right
                            >
                                <Row className="shortcuts px-4">
                                    <Col
                                        className="shortcut-item"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        xs="6"
                                        // tag={Link}
                                        // to="/auth/login"
                                    >
                                        <Link to="/auth/login">
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                                                <i className="ni ni-curved-next" />
                                            </span>
                                            <small>Back</small>
                                        </Link>
                                    </Col>
                                    <Col
                                        className="shortcut-item"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        xs="6"
                                        tag="a"
                                    >
                                        <Link to="/auth/reports">
                                        <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                                            <i className="ni ni-books" />
                                        </span>
                                        <small>Reports</small>
                                        </Link>
                                    </Col>
                                </Row>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <Row className="justify-content-center flex-fill">
                            <Col className="px-5 text-center" lg="6" md="8" xl="5">
                                {title ? <h1 className="text-white">{title}</h1> : null}
                                {lead ? <p className="text-lead text-white">{lead}</p> : null}
                            </Col>
                        </Row>
                    </div>
                </Container>
                <div className="separator separator-bottom separator-skew zindex-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon className="fill-default" points="2560 0 2560 100 0 100" />
                    </svg>
                </div>
            </div>
        </>
    );
}

MenuHeader.propTypes = {
    title: PropTypes.string,
    lead: PropTypes.string,
};

export default MenuHeader;
