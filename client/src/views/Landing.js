import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import HeaderComponent from '../components/navigation/HeaderComponent';
import WidgetDisplay from '../components/WidgetDisplay';

function getWidgets(whatToFetch, setValue) {
    var responseClone;
    fetch(whatToFetch)
        .then(function (response) {
            responseClone = response.clone();
            return response.json();
        })
        .then(
            data => {
                setValue(data);
            },
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

function Landing() {
    const [userWidgets, setUserWidgets] = useState([]);
    const [activeWidgets, setActiveWidgets] = useState([]);
    const [inactiveWidgets, setInactiveWidgets] = useState([]);

    function getUserWidgets() {
        // Will need to figure out the ID Dynamically. Statically set for now
        getWidgets(
            process.env.REACT_APP_BACKEND +
                '/api/user/personalWidgets/63a24f7e508fa51d6962783b',
            setUserWidgets
        );

        // Need to make a request with the widgets object IDs
    }

    function getActiveWidgets() {
        const fetchLiveWidget =
            process.env.REACT_APP_BACKEND + '/api/widget/active';
        getWidgets(fetchLiveWidget, setActiveWidgets);
    }

    function getInactiveWidgets() {
        const fetchInactiveWidget =
            process.env.REACT_APP_BACKEND + '/api/widget/inactive';
        getWidgets(fetchInactiveWidget, setInactiveWidgets);
    }

    useEffect(() => {
        getActiveWidgets();
        getInactiveWidgets();
        getUserWidgets();
    }, []);

    return (
        <>
            <HeaderComponent />

            <Container>
                <Row>
                    <h1>Your Widgets</h1>
                </Row>
                <Row xs={1} sm={2} md={3} className="justify-content-center">
                    {userWidgets.map((widget, index) => {
                        return <WidgetDisplay data={widget} key={index} />;
                    })}

                    {/* When a map comes back
                    {userWidgets !== null && (
                        <WidgetDisplay data={userWidgets} />
                    )} */}
                </Row>
                <hr />
                <Row>
                    <h1>Available Widgets</h1>
                </Row>
                <Row xs={1} sm={2} md={3} className="justify-content-center">
                    {activeWidgets.map((widget, index) => {
                        return <WidgetDisplay data={widget} key={index} />;
                    })}
                </Row>
                <hr />
                <Row>
                    <h1>Coming Soon</h1>
                </Row>
                <Row xs={1} sm={2} md={4} className="justify-content-center">
                    {inactiveWidgets.map((widget, index) => {
                        return <WidgetDisplay data={widget} key={index} />;
                    })}
                </Row>
            </Container>
        </>
    );
}

export default Landing;
