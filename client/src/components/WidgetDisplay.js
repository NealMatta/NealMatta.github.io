import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

function WidgetDisplay(props) {
    console.log(props.data);
    // style={{ width: '18rem' }}
    return (
        <Col>
            <Card className="mb-4">
                <Card.Img
                    className="cardImage"
                    variant="top"
                    src="https://indify.co/widgetGallery/countdown.svg"
                />
                <Card.Link href="/characterCounter" />
                <Card.Body>
                    <Card.Title>{props.data}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                    <Link role="button" to="/characterCounter">
                        Create Widget
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default WidgetDisplay;
