import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { createNewWidget, deleteWidget } from '../services/widgetsServices';

function WidgetDisplay(props) {
    let navigate = useNavigate();
    const backgroundColor = props.data.widgetDetails.backgroundColor;
    const { token } = useAuth();

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

    async function modifyWidget() {
        // Make sure I'm allowed to grab it
        let whatToFetch = `${process.env.REACT_APP_BACKEND}/api/createdWidgets/personalWidget/${props.userConfig?._id}`;
        console.log(whatToFetch);
        // FUTURE - Replace with Axios
        // FUTURE - Only return the ID
        const createdWidget = await fetch(whatToFetch, {
            method: 'GET',
        });

        const createdWidgetJson = await createdWidget.json();

        // FUTURE - Better error handling
        !createdWidget.ok
            ? console.error('ERROR - Created Widget was not grabbed')
            : console.log('SUCCESS - Created Widget Grabbed!');

        whatToFetch = `${process.env.REACT_APP_BACKEND}/api/user/personalWidgets/validate/${createdWidgetJson[0]._id}`;
        const allowToModify = await fetch(whatToFetch, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const allowToModifyJson = await allowToModify.json();

        // FUTURE - Better error handling
        !allowToModify.ok
            ? console.error(
                  'ERROR - Something went wrong when checking if the value existed'
              )
            : console.log('SUCCESS - Value may have been found');

        allowToModifyJson
            ? navigate(createLink('configure'))
            : navigate('notFound');
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
                                                createNewWidget(
                                                    props.data.widgetRoute,
                                                    token
                                                );
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
                                    <Button onClick={modifyWidget}>
                                        Modify
                                    </Button>
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
                                            deleteWidget(
                                                props.data.widgetRoute,
                                                props.userConfig._id,
                                                token
                                            );
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
