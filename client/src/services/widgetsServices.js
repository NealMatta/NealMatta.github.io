import axios from 'axios';

/* TL;DR: Creates a New Widget
- Creates a new instance in the associated widget table
- The associated widget table knows the model, UID, and ID of the widget in 
    the Widgets database
- New instance is created in the CreatedWidgets Database using the values from above
- Grab the ID from the instance of the Created Widgets table and 
    push it to the Personal Widgets array of the user we're logged in as */
export async function createNewWidget(widgetRoute, token) {
    // FUTURE - Need to make sure that the user is logged in

    // FUTURE - Error handling to make sure all steps are executed
    // FUTURE - Send to a loading page

    // Create a new instance in the associated widget database
    const newUserWidget = await fetch(
        `${process.env.REACT_APP_BACKEND}/api/widgets/${widgetRoute}/create`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`,
            },
        }
    );

    // This is Personal Widget ID, Widget Model, and Widget Config ID
    const newUserWidgetJson = await newUserWidget.json();
    // FUTURE - Better error handling
    !newUserWidget.ok
        ? console.error('ERROR - Widget was not created')
        : console.log('SUCCESS - Widget Created!');

    // Creating a new instance in the Created Widgets Database
    const newCreatedWidget = await fetch(
        `${process.env.REACT_APP_BACKEND}/api/createdWidgets/`,
        {
            method: 'POST',
            body: JSON.stringify(newUserWidgetJson),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    // This will have the ID of the newly created widget
    const idOfInsertedWidget = await newCreatedWidget.json();
    !newCreatedWidget.ok
        ? console.error('ERROR - Not inserted into created Widgets Section')
        : console.log('SUCCESS - Inserted into Created Widgets!');

    // Pushing the ID into the user's personal widget's array
    const insertIntoUsersPersonalWidget = await fetch(
        `${process.env.REACT_APP_BACKEND}/api/user/personalWidgets/add`,
        {
            method: 'PATCH',
            body: JSON.stringify({ idToAdd: idOfInsertedWidget }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    !insertIntoUsersPersonalWidget.ok
        ? console.error('ERROR - Not inserted into Personal Widgets Section')
        : console.log('SUCCESS - Inserted into Personal Widgets Section!');
}

// FUTURE - First, get the associated widgetID not from an API Call. Then Use Promise.all here maybe
export async function deleteWidget(widgetRoute, widgetId, token) {
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
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    !deleteUserArray.ok
        ? console.error('ERROR - Not deleted from user personal widget array')
        : console.log(`SUCCESS -  Personal Widgets Array`);
}

export async function getUserWidgets(whatToFetch, token) {
    try {
        const payload = await axios.get(whatToFetch, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return payload.data;
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            if (error.response) {
                // The client was given an error response (5xx, 4xx)
                console.error(error.response.data);
                // console.error(err.response.status);
                // console.error(err.response.headers);
            } else if (error.request) {
                // The client never received a response, and the request was never left
                console.error(error.request);
            } else {
                // Anything else
                console.error('Error', error.message);
            }
        }
    }
}

// FUTURE - Consolidate getActiveWidgets and getInactiveWidgets
export async function getActiveWidgets(whatToFetch) {
    try {
        const payload = await axios.get(whatToFetch);
        return payload.data;
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            if (error.response) {
                // The client was given an error response (5xx, 4xx)
                console.error(error.response.data);
                // console.error(err.response.status);
                // console.error(err.response.headers);
            } else if (error.request) {
                // The client never received a response, and the request was never left
                console.error(error.request);
            } else {
                // Anything else
                console.error('Error', error.message);
            }
        }
    }
}

export async function getInactiveWidgets(whatToFetch) {
    try {
        const payload = await axios.get(whatToFetch);
        return payload.data;
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            if (error.response) {
                // The client was given an error response (5xx, 4xx)
                console.error(error.response.data);
                // console.error(err.response.status);
                // console.error(err.response.headers);
            } else if (error.request) {
                // The client never received a response, and the request was never left
                console.error(error.request);
            } else {
                // Anything else
                console.error('Error', error.message);
            }
        }
    }
}

// FUTURE - Make is so that I don't need to rely on one get function to run another
export async function isAllowedToConfigureWidget(inputID, token) {
    try {
        const fetchURL = `${process.env.REACT_APP_BACKEND}/api/createdWidgets/personalWidget/${inputID}`;
        // FUTURE - Only return the ID

        // Grab data from the users personal widgets
        const createdWidget = await axios.get(fetchURL);

        if (process.env.NODE_ENV === 'development')
            console.log('SUCCESS - Created Widget Grabbed!');

        const newVal = `${process.env.REACT_APP_BACKEND}/api/user/personalWidgets/validate/${createdWidget.data[0]._id}`;
        const allowToModify = await axios.get(newVal, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (process.env.NODE_ENV === 'development')
            console.log('SUCCESS - Value may have been found');

        return allowToModify.data; // True if allowed to navigate and false if not supposed to
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            if (err.response) {
                // The client was given an error response (5xx, 4xx)
                console.error(err.response.data);
                // console.error(err.response.status);
                // console.error(err.response.headers);
            } else if (err.request) {
                // The client never received a response, and the request was never left
                console.error(err.request);
            } else {
                // Anything else
                console.error('Error', err.message);
            }
        }
    }
}
