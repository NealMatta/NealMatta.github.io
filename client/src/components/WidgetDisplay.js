import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
// FUTURE - Auth would come back into play when I want to edit these from the front end
// import { useAuth } from '../contexts/AuthContext';

function WidgetDisplay(props) {
    let navigate = useNavigate();
    const handleView = () => {
        navigate(props.data.widgetDetails.link);
    };
    const backgroundColor = props.data.widgetDetails.backgroundColor;
    // FUTURE - Auth would come back into play when I want to edit these from the front end
    // const { token } = useAuth();

    return (
        <Col>
            <Card className="mb-4 shadow-sm">
                <Card.Img
                    className="cardImage"
                    variant="top"
                    src={props.data.widgetDetails.imageHeader}
                    style={{ background: backgroundColor }}
                />
                <Card.Body>
                    <Card.Title>
                        {props.userConfig?.widgetName ||
                            props.data.widgetDefaultName}
                    </Card.Title>
                    <Card.Text>
                        {props.data.widgetDetails.description}
                    </Card.Text>
                    <Row>
                        {/* Available Widgets */}
                        {props.data.live === true && props.userWidget !== true && (
                            <>
                                <Col>
                                    <Button onClick={handleView}>View</Button>
                                </Col>
                            </>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default WidgetDisplay;
