import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CTATrainAlert from '../../components/CTATrainAlert';

function CTATrainTracker() {
    const [dataGrabbed, setDataGrabbed] = useState(false);
    const [eta, setETA] = useState(null);
    // const [timestamp, setTimestamp] = useState(null);
    // const [errorCode, setErrorCode] = useState(null);
    // const [errorName, setErrorName] = useState(null);

    function getCTAData() {
        var responseClone;
        const fetchAPI = process.env.REACT_APP_BACKEND + '/getCTA';
        fetch(fetchAPI)
            .then(function (response) {
                responseClone = response.clone();
                return response.json();
            })
            .then(
                data => {
                    let tempETA = [];
                    // eslint-disable-next-line
                    Object.values(data.eta).map(item => {
                        tempETA.push(item);
                    });

                    setETA(tempETA);
                    // setTimestamp(data.tmst);
                    // setErrorCode(data.errCd);
                    // setErrorName(data.errNm);
                    setDataGrabbed(true);
                },
                // Error handling of the API
                rejectionReason => {
                    console.log(
                        'Error parsing JSON from response:',
                        rejectionReason,
                        responseClone
                    );
                    responseClone.text().then(function (bodyText) {
                        console.log(
                            'Received the following instead of valid JSON:',
                            bodyText
                        );
                    });
                }
            );
    }

    useEffect(() => {
        getCTAData();
        setInterval(getCTAData, 60000);
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="trainContainer">
                        {dataGrabbed &&
                            eta.map((task, index) => {
                                // <p>{index}</p>;
                                return (
                                    <CTATrainAlert data={task} key={index} />
                                );
                            })}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CTATrainTracker;
