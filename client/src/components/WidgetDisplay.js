import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

function WidgetDisplay(props) {
    const backgroundColor = props.data.widgetDetails.backgroundColor;
    function createLink(status) {
        const link =
            'widget/' +
            status +
            '/' +
            props.data.widgetDetails.link +
            '/' +
            props.userConfig?._id;
        return link;
    }

    async function createNewWidget() {
        // Send to a loading page
        // Grab the associated widget model + associated widget route (Will be the widget route)
        const widgetModel = props.data.widgetModel; // May not need to pass it from here
        const widgetRoute = props.data.widgetRoute;
        // Create a new instance in the associated widget database
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND}/api/widgets/${widgetRoute}/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const json = await response.json();
        if (!response.ok) {
            console.error('Quotes Widget was not created');
        } else {
            console.log('Quotes Widget Created!');
        }
        // Create a new instance in the Created Widgets Database
        // This takes Personal Widget ID, Widget Model, and Widget Config ID
        const secondResponse = await fetch(
            `${process.env.REACT_APP_BACKEND}/api/createdWidgets/`,
            {
                method: 'POST',
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const secondJson = await secondResponse.json();
        if (!secondResponse.ok) {
            console.error('Not inserted into created Widgets Section');
        } else {
            console.log('Inserted into Created Widgets!');
        }

        // Add to Users personal widgets
    }

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
                                    <Link role="button">
                                        <Button
                                            onClick={() => {
                                                createNewWidget();
                                            }}
                                        >
                                            Create New
                                        </Button>
                                    </Link>
                                </Col>
                            </>
                        )}
                        {/* Your Widgets */}
                        {props.userWidget === true && (
                            <>
                                <Col>
                                    <Link
                                        role="button"
                                        to={createLink('configure')}
                                    >
                                        <Button>Modify</Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                document.location.href +
                                                    createLink('live')
                                            );
                                        }}
                                    >
                                        Copy Link
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        onClick={() => {
                                            console.log(
                                                'Duplicate in progress'
                                            );
                                        }}
                                    >
                                        Duplicate
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
