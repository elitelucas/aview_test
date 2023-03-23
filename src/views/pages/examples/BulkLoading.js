
import React, { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
// core components
import MenuHeader from "components/Headers/MenuHeader.js";
// bulk loading success page component
import BulkLoadingSuccess from "views/pages/examples/BLSuccess.js";
import BulkLoadingFail from "views/pages/examples/BLFail.js";

import { publicFetch } from '../../../util/fetcher.js';
import { AuthContext } from '../../../store/auth.js';

var response = {};

function BulkLoading() {
    const { authState, logout } = useContext(AuthContext);
    const username = authState.userInfo.username;
    const user_id = authState.userInfo.id;
    console.log('user_id =>', user_id);

    const [formData, setFormData] = useState({
        // loadFor: "083 1234567",
        networkProvider: "Network Provider 1",
        type: "Mobile Airtime",
        amount: "0",
        // mobileNumber: "08312346578",
    });
    const {  networkProvider, type, amount } = formData;

    const [showing, setShowing] = useState("main");
    const [errStatus, setErrStatus] = useState("");

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    console.log( "networkProvider =>", networkProvider, "type =>", type, "amount =>", amount );

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await publicFetch.post('/bulk-loading/transaction', { user_id, data: formData });
            console.log(data);
            response = data;
            if (data.status == 200) {
                console.log("Status 200, Showing success page");
                setShowing("success");
            } else {
                console.log("Status 500, Showing fail page");
                setShowing("fail");
            }
        } catch (error) {
            let errorMessage = error.response.data.message;
            errorMessage ? setErrStatus(JSON.parse(JSON.stringify(errorMessage))) : setErrStatus('');
            console.log('error =>', JSON.stringify(errorMessage), 'errStatus =>', errStatus);
        }

    };

    return (
        <>
            {showing === "main" &&
                <MenuHeader
                    title={username}
                />}
            {showing === "main" &&
                <Container className="text-center pb-4 px-2 px-lg-8" style={{ marginTop: '-10rem' }}>
                    <Card className="card-pricing bg-gradient-success zoom-in shadow-lg rounded border-0 text-center mb-4 mx-4">
                        {/* <CardHeader className="bg-transparent">
                        <h4 className="text-uppercase ls-1 text-white py-3 mb-0">
                            Alpha pack
                        </h4>
                    </CardHeader> */}
                        <CardBody className="px-lg-6 pb-2">
                            <Form>
                                <FormGroup className="row">
                                    <Label
                                        className="form-control-label text-left"
                                        htmlFor="example-text-input"
                                        md="3"
                                    >
                                        Type
                                    </Label>
                                    <Col md="9">
                                        <Input id="exampleFormControlSelect1" type="select" name="type" value={type} onChange={(e) => onChange(e)}>
                                            <option>Mobile Airtime</option>
                                            <option>Data bundle</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Form>
                                <FormGroup className="row">
                                    <Label
                                        className="form-control-label text-left"
                                        htmlFor="example-text-input"
                                        md="3"
                                    >
                                        <div className="mt-3">File attachment</div>
                                    </Label>
                                    <Col md="9" className="">
                                        <div className="custom-file mt-3">
                                            <label
                                                className="custom-file-label"
                                                htmlFor="exampleFile"
                                            >
                                                Select file
                                            </label>
                                            <Input
                                                id="exampleFile"
                                                name="file"
                                                type="file"
                                            />
                                        </div>
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Form>
                                <FormGroup className="row">
                                    <Label
                                        className="form-control-label text-left"
                                        htmlFor="example-text-input"
                                        md="3"
                                    >
                                        Network
                                    </Label>
                                    <Col md="9">
                                        <Input id="exampleFormControlSelect2" type="select" name="networkProvider" value={networkProvider} onChange={(e) => onChange(e)}>
                                            <option>Network 1</option>
                                            <option>Network 2</option>
                                            <option>Network 3</option>
                                            <option>Network 4</option>
                                            <option>Network 5</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Form>
                                <FormGroup className="row">
                                    <Label
                                        className="form-control-label text-left"
                                        htmlFor="example-text-input"
                                        md="3"
                                    >
                                        Product
                                    </Label>
                                    <Col md="5">
                                        <Input id="exampleFormControlSelect4" type="select">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Input
                                            placeholder="Amount"
                                            id="example-text-input"
                                            type="text"
                                            name="amount"
                                            value={amount}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </Col>
                                </FormGroup>
                            </Form>
                            {<div className='mb-3' style={{ color: '#fb6340' }}>{(errStatus || errStatus.length !== 0) && <small>{errStatus}</small>}</div>}
                        </CardBody>
                    </Card>
                </Container>}
            {showing === "success" &&
                <BulkLoadingSuccess response={response} />}
            {showing === "fail" &&
                <BulkLoadingFail response={response} />
            }
            {showing === "main" &&
                <Container className="text-center pb-5">
                    <Button
                        className=" my-2 mr-4"
                        color="primary"
                        onClick={(e) => onSubmit(e)}
                    >
                        Submit
                    </Button>
                    <Button
                        className="btn-neutral my-2"
                        color="default"
                        onClick={() => logout()}
                    >
                        Logout
                    </Button>
                </Container>}
        </>
    );
}

export default BulkLoading;
