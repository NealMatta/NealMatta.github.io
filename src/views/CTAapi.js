import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const baseURL =
    'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
    process.env.REACT_APP_CTA_API +
    '&mapid=40380&max=5';

function CTAapi() {
    // console.log(process.env.REACT_APP_CTA_API)
    const [res, setRes] = useState(null);

    useEffect(() => {
        axios.get(baseURL).then(response => {
            console.log(response);
            setRes(response.data);
        });
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>CTA API Pages</h1>
                    <p>{res}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default CTAapi;
