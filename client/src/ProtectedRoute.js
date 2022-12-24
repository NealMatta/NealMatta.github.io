import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { Route, redirect } from 'react-router-dom';

export default function ProtectedRoute(props) {
    const { currentUser } = useAuth();

    if (currentUser === null) {
        return <redirect to={props.redirectTo} />;
    } else {
        return (
            <Route exact path={props.path}>
                {props.children}
            </Route>
        );
    }
    // return null;

    // if (authValue.userDataPresent) {
    //     if (authValue.user == null) {
    //         return <Redirect to={props.redirectTo}></Redirect>;
    //     } else {
    //         return (
    //             <Route exact path={props.path}>
    //                 {props.children}
    //             </Route>
    //         );
    //     }
    // } else {
    //     return null;
    // }
}
