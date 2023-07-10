import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import HeaderComponent from '../components/navigation/HeaderComponent';
import WidgetDisplay from '../components/WidgetDisplay';
// import { useAuth } from '../contexts/AuthContext';
import {
    getActiveWidgets,
    getInactiveWidgets,
} from '../services/widgetsServices';

function Landing() {
    // const [userWidgets, setUserWidgets] = useState([]);
    const [activeWidgets, setActiveWidgets] = useState([]);
    const [inactiveWidgets, setInactiveWidgets] = useState([]);

    const fetchLiveWidget =
        process.env.REACT_APP_BACKEND + '/api/widget/active';

    const fetchInactiveWidget =
        process.env.REACT_APP_BACKEND + '/api/widget/inactive';

    useEffect(() => {
        getActiveWidgets(fetchLiveWidget).then(res => {
            setActiveWidgets(res);
        });
        getInactiveWidgets(fetchInactiveWidget).then(res => {
            setInactiveWidgets(res);
        });
    }, []);

    return (
        <>
            <HeaderComponent />

            <Container>
                <Row>
                    <h1>Available</h1>
                </Row>
                <Row xs={1} sm={2} md={5} className="justify-content-center">
                    {activeWidgets &&
                        activeWidgets.map((widget, index) => {
                            return <WidgetDisplay data={widget} key={index} />;
                        })}
                </Row>
                <hr />
                <Row>
                    <h1>Eventually</h1>
                </Row>
                <Row xs={1} sm={2} md={5} className="justify-content-center">
                    {inactiveWidgets &&
                        inactiveWidgets.map((widget, index) => {
                            return <WidgetDisplay data={widget} key={index} />;
                        })}
                </Row>
            </Container>
        </>
    );
}

export default Landing;
