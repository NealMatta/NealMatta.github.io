import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

function CTAapi() {
    // console.log(process.env.REACT_APP_CTA_API)
    const [backendData, setBackendData] = useState(null);

    // useEffect(() => {
    //     fetch(baseURL)
    //         .then(res => res.json())
    //         .then(d => {
    //             setData(d);
    //             console.log(data);
    //         });
    // }, []);

    // useEffect(() => {
    // fetch('/api').then(response => response.json());
    // .then(data => {
    //     setBackendData(data);
    // });
    // });

    var responseClone; // 1
    fetch('http://localhost:3001/api')
        .then(function (response) {
            responseClone = response.clone(); // 2
            return response.json();
        })
        .then(
            function (data) {
                console.log(data);
                // Do something with data
            },
            function (rejectionReason) {
                // 3
                console.log(
                    'Error parsing JSON from response:',
                    rejectionReason,
                    responseClone
                ); // 4
                responseClone
                    .text() // 5
                    .then(function (bodyText) {
                        console.log(
                            'Received the following instead of valid JSON:',
                            bodyText
                        ); // 6
                    });
            }
        );

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>CTA API Pages</h1>
                    {/* <p>{backendData}</p> */}
                </Col>
            </Row>
        </Container>
    );
}

export default CTAapi;
