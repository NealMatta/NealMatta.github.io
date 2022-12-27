import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function WidgetDisplay(props) {
    const backgroundColor = props.data.widgetDetails.backgroundColor;
    const { currentUser } = useAuth();

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
    - Grab the ID from the instance of the Created Widgets table and 
        push it to the Personal Widgets array of the user we're logged in as */
    async function createNewWidget() {
        // FUTURE - Need to make sure that the user is logged in

        // FUTURE - Error handling to make sure all steps are executed
        // FUTURE - Send to a loading page
        const widgetRoute = props.data.widgetRoute;
        // Create a new instance in the associated widget database
        currentUser.getIdToken().then(token => {
            getWidgets(fetchLiveWidget, setActiveWidgets, token);
        });
        const newUserWidget = await fetch(
            `${process.env.REACT_APP_BACKEND}/api/widgets/${widgetRoute}/create`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // // This is Personal Widget ID, Widget Model, and Widget Config ID
        // const newUserWidgetJson = await newUserWidget.json();
        // // FUTURE - Better error handling
        // !newUserWidget.ok
        //     ? console.error('ERROR - Widget was not created')
        //     : console.log('SUCCESS - Widget Created!');

        // // Creating a new instance in the Created Widgets Database
        // const newCreatedWidget = await fetch(
        //     `${process.env.REACT_APP_BACKEND}/api/createdWidgets/`,
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(newUserWidgetJson),
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );
        // // This will have the ID of the newly created widget
        // const idOfInsertedWidget = await newCreatedWidget.json();
        // !newCreatedWidget.ok
        //     ? console.error('ERROR - Not inserted into created Widgets Section')
        //     : console.log('SUCCESS - Inserted into Created Widgets!');

        // // Pushing the ID into the user's personal widget's array
        // const insertIntoUsersPersonalWidget = await fetch(
        //     `${process.env.REACT_APP_BACKEND}/api/user/personalWidgets/add`,
        //     {
        //         method: 'PATCH',
        //         body: JSON.stringify({ idToAdd: idOfInsertedWidget }),
        //         headers: {
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     }
        // );
        // !insertIntoUsersPersonalWidget.ok
        //     ? console.error(
        //           'ERROR - Not inserted into Personal Widgets Section'
        //       )
        //     : console.log('SUCCESS - Inserted into Personal Widgets Section!');
    }

    async function deleteWidget() {
        const widgetRoute = props.data.widgetRoute;
        const widgetId = props.userConfig._id; // Refers to the associated widget database ID

        // Deleting the widget from the associated widget database
        const deleteFromAssociatedWidgetDB = await fetch(
            `${process.env.REACT_APP_BACKEND}/api/widgets/${widgetRoute}/delete/${widgetId}`,
            {
                method: 'DELETE',
            }
        );

        !deleteFromAssociatedWidgetDB.ok
            ? console.error('ERROR - Not deleted from associated widget db')
            : console.log(`SUCCESS -  ${widgetRoute} DB`);

        // Delete the widget instance
        const idOfPersonalWidget = await fetch(
            `${process.env.REACT_APP_BACKEND}/api/createdWidgets/delete/${widgetId}`,
            {
                method: 'DELETE',
            }
        );
        const associatedWidgetId = await idOfPersonalWidget.json();
        !idOfPersonalWidget.ok
            ? console.error('ERROR - Not deleted from created widgets db')
            : console.log(`SUCCESS -  Created Widgets DB`);

        // Delete from user's Personal Widget array
        const deleteUserArray = await fetch(
            `${process.env.REACT_APP_BACKEND}/api/user/personalWidgets/deleteOne/${associatedWidgetId}`,
            {
                method: 'PATCH',
            }
        );

        !deleteUserArray.ok
            ? console.error(
                  'ERROR - Not deleted from user personal widget array'
              )
            : console.log(`SUCCESS -  Personal Widgets Array`);
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
                                <Col>
                                    <Button
                                        onClick={() => {
                                            deleteWidget();
                                        }}
                                    >
                                        Delete
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
