import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

function WidgetDisplay(props) {
    // const [backgroundColor, setBackgroundColor] = useState(null);
    // setBackgroundColor(props.data.backgroundColor);

    const backgroundColor = props.data.backgroundColor;

    return (
        <Col>
            <Card className="mb-4">
                <Card.Img
                    className="cardImage"
                    variant="top"
                    src={props.data.imageHeader}
                    style={{ background: backgroundColor }}
                />
                <Card.Body>
                    <Card.Title>{props.data.widgetName}</Card.Title>
                    <Card.Text>{props.data.description}</Card.Text>
                    {props.data.live == 'TRUE' && (
                        <Link role="button" to={props.data.link}>
                            Create Widget
                        </Link>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}

export default WidgetDisplay;
