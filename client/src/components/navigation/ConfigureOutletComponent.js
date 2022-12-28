import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { modifyWidget } from '../../services/widgetsServices';
import { useAuth } from '../../contexts/AuthContext';

export default function ConfigureOutletComponent() {
    const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const { token } = useAuth();

    useEffect(() => {
        modifyWidget(
            'http://localhost:3002/api/createdWidgets/personalWidget/63ab778d127fa0e630f20df5',
            token
        );
    });

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
