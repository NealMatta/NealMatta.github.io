import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
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

    /* TL;DR: Creates a New Widget
    - Creates a new instance in the associated widget table
    - The associated widget table knows the model, UID, and ID of the widget in 
        the Widgets database
    - New instance is created in the CreatedWidgets Database using the values from above
    
    ||| Still needs to be done ||| 

    - Grab the ID from the instance of the Created Widgets table and 
        push it to the Personal Widgets array of the user we're logged in as
    */
    async function createNewWidget() {
        // FUTURE - Send to a loading page
        const widgetRoute = props.data.widgetRoute;
        // Create a new instance in the associated widget database
        const newUserWidget = await fetch(
            `${process.env.REACT_APP_BACKEND}/api/widgets/${widgetRoute}/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // This is Personal Widget ID, Widget Model, and Widget Config ID
        const newUserWidgetJson = await newUserWidget.json();
        // FUTURE - Better error handling
        if (!newUserWidget.ok) {
            console.error('Widget was not created');
        } else {
            console.log('Widget Created!');
        }

        // Creating a new instance in the Created Widgets Database
        const newCreatedWidget = await fetch(
            `${process.env.REACT_APP_BACKEND}/api/createdWidgets/`,
            {
                method: 'POST',
                body: JSON.stringify(newUserWidgetJson),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        // This will have the ID of the newly created widget
        const secondJson = await newCreatedWidget.json();
        if (!newCreatedWidget.ok) {
            console.error('Not inserted into created Widgets Section');
        } else {
            console.log('Inserted into Created Widgets!');
        }

        // AFTER CREATION, NEED TO PUSH THE ID INTO THE USERS PESRONAL WIDGETS ARRAY
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
