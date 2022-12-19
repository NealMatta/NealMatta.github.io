import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

function WidgetDisplay(props) {
    const backgroundColor = props.data.widgetDetails.backgroundColor;
    const linkToWidget =
        document.location.href +
        'widget/live/' +
        props.data.widgetDetails.link +
        '/WIDGET_ID';
    const configureLink =
        'widget/configure/' + props.data.widgetDetails.link + '/WIDGET_ID';

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
                    <Card.Title>{props.data.widgetName}</Card.Title>
                    <Card.Text>
                        {props.data.widgetDetails.description}
                    </Card.Text>
                    <Row>
                        {props.data.live === true && (
                            <>
                                <Col>
                                    <Link role="button" to={configureLink}>
                                        <Button>Create New</Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                linkToWidget
                                            );
                                        }}
                                    >
                                        Copy Link
                                    </Button>
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
