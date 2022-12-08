import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderComponent from '../components/navigation/HeaderComponent';
import WidgetDisplay from '../components/WidgetDisplay';

let rawWidgets = require('../widgets.json');

function Landing() {
    let activeWidgets = [];
    let inactiveWidgets = [];

    rawWidgets.map(widget => {
        widget.live == 'TRUE'
            ? activeWidgets.push(widget)
            : inactiveWidgets.push(widget);
    });

    return (
        <>
            <HeaderComponent />

            <Container>
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
