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
                Authorization: `Bearer ${token}`,
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
                // Authorization: `Bearer ${token}`,
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
