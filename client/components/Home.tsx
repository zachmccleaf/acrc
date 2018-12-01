import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
        <div>
            <a href="/api/account/login">Log In with Strava</a>
            <br />
            <a href="/api/account/user">Get User Account Info</a>
        </div>
        );
    }
}
