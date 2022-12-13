import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function ConfigureOutletComponent() {
    const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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
