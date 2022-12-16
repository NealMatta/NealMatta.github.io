import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

function WidgetDisplay(props) {
    const backgroundColor = props.data.backgroundColor;
    const linkToWidget =
        document.location.href +
        'widget/live/' +
        props.data.link +
        '/WIDGET_ID';
    const configureLink = 'widget/configure/' + props.data.link + '/WIDGET_ID';

    return (
        <Col>
            <Card className="mb-4 shadow-sm">
                <Card.Img
                    className="cardImage"
                    variant="top"
                    src={props.data.imageHeader}
                    style={{ background: backgroundColor }}
                />
                <Card.Body>
                    <Card.Title>{props.data.widgetName}</Card.Title>
                    <Card.Text>{props.data.description}</Card.Text>
                    <Row>
                        {props.data.live === 'TRUE' && (
                            <>
                                <Col>
                                    <Link role="button" to={configureLink}>
                                        <Button>Modify</Button>
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
