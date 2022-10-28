import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const baseURL =
    'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
    process.env.REACT_APP_CTA_API +
    '&mapid=40380&max=5';

function CTAapi() {
    // console.log(process.env.REACT_APP_CTA_API)
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(baseURL)
            .then(res => res.json())
            .then(d => {
                setData(d);
                console.log(data);
            });
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>CTA API Pages</h1>
                    <p>{data}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default CTAapi;
