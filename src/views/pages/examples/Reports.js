
import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";

// JavaScript library that creates a callendar with events
// import { Calendar } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { widgetEvents } from "variables/general.js";

// react-date-range
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

// reactstrap components
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Button
} from "reactstrap";
// core components
import MenuHeader from "components/Headers/MenuHeader.js";
import { publicFetch } from '../../../util/fetcher.js';


function Reports() {

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const generateReport = async () => {
        console.log(state[0].startDate)
        console.log(state[0].endDate)

        const { data } = await publicFetch.post('/report/generate', {
            startDate: state[0].startDate,
            endDate: state[0].endDate,
        });
        if (data.result) {
            window.open(`${process.env.REACT_APP_BACKEND_URL}/${data.data}`, '_blank');
        } else {
            console.log("Status 500, Showing fail page");
        }
    }
    return (
        <>
            <MenuHeader
                title="Reports"
            />
            <Container className="px-2 pb-2" style={{ marginTop: '-10rem' }}>
                <Row className="justify-content-center">
                    <Col lg="3">
                        {/* <Card className="card-lift--hover shadow border-0"> */}
                        <Card className=" shadow border-0">
                            <CardBody className="py-5">
                                <h4 className="h3 text-info text-uppercase">
                                    Generate transaction report
                                </h4>
                                <p className="description mt-3">
                                    Select option:
                                </p>
                                <div className="text-left pl-lg-4">
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input
                                            className="custom-control-input"
                                            // defaultChecked
                                            id="customCheck1"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheck1"
                                        >
                                            Single loading
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input
                                            className="custom-control-input"
                                            // defaultChecked
                                            id="customCheck2"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheck2"
                                        >
                                            Bulk loading
                                        </label>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="9">
                        {/* <Card className=" shadow border-0">
                            <CardBody > */}
                        {/* <div ref={widgetCalendarRef} /> */}
                        <DateRangePicker
                            onChange={item => setState([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={state}
                            direction="horizontal"
                            style={{ width: '300px' }}
                        />;
                        {/* </CardBody>
                        </Card> */}
                    </Col>
                </Row>
            </Container>
            <Container className="text-center pb-5">
                <Button
                    className=" my-2 mr-4"
                    color="primary"
                    onClick={generateReport}
                >
                    Generate Report
                </Button>
                <Button
                    className="btn-neutral my-2"
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

export default Reports;
