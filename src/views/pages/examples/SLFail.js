
import React, { useContext } from "react";
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
import MenuHeader from "components/Headers/MenuHeader.js";
import { AuthContext } from '../../../store/auth.js';

function SingleLoadingFail({ response }) {
    const { logout } = useContext(AuthContext);
    return (
        <>
            <MenuHeader
                title="Failed loading"
            />
            <Container className="mt--8 px-2 px-lg-8 pb-5">
                <Card className="card-pricing bg-gradient-default  mx-4  zoom-out shadow rounded border-0  mb-1 ">
                    <CardBody>
                        <div className="my-3">
                            {
                                Object.keys(response).map((key, index) =>
                                    <p className="text-white" key={index}>
                                        <strong>{key}:</strong> {response[key]}
                                    </p>
                                )
                            }
                            {/* <p className="text-white">
                                <strong>UniqID internal:</strong> {response.requestId}                               
                            </p> */}
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

export default SingleLoadingFail;
