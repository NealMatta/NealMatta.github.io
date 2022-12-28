import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { modifyWidget } from '../../services/widgetsServices';
import { useAuth } from '../../contexts/AuthContext';

export default function ConfigureOutletComponent() {
    let navigate = useNavigate();
    const { token } = useAuth();
    const { widgetid } = useParams();

    const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    console.log(widgetid);

    // FUTURE - Until this finishes loading, don't put anything on the screen
    // FUTURE - I don't think is the best way of approaching this. Look into props
    function validateAccess(widgetid) {
        // Check that there are 6 values
        modifyWidget(widgetid, token).then(validation => {
            if (!validation) navigate('notFound');
        });
    }

    useEffect(() => {
        validateAccess(widgetid);
    }, [widgetid]);

    return (
        <div className="alt-grid">
            <Container>
                <Row>
                    <Col
                        sm={12}
                        md={4}
                        className="configureSide justify-content-center"
                    >
                        <Row className="configureHeaderView">
                            <h1>Widget Name</h1>
                            <hr />
                        </Row>
                        <div className="settingsView">
                            {temp.map((widget, index) => {
                                return (
                                    <Row>
                                        <h1>Hello</h1>
                                    </Row>
                                );
                            })}
                        </div>
                        <Row className="configureFooterView">
                            <hr />
                            <p>
                                COPY LINK (THEN PASTE INTO NOTION, AND CLICK
                                "EMBED")
                            </p>
                            <Button>Copy Link</Button>
                        </Row>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

// >
