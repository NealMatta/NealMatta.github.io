import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';

function Landing() {
    return (
        <>
            <HeaderComponent />
            <Container>
                <Row>
                    <h1>My Widgets</h1>
                </Row>
                <hr></hr>
                <Row>
                    <h1>Explore Widgets</h1>
                    <Link to="/characterCounter">Character Counter</Link>
                    <Link to="/quotes">Quotes</Link>
                    <Link to="/CTA">CTA API</Link>
                    <Link to="/clock">Clock</Link>
                    {/* <Link to="/GoogleCalendarAddTask">
                    Google Calendar Add Task
                </Link> */}
                </Row>
                <hr />
                <Row>
                    <h1>Coming Soon</h1>
                    <h2>Simple</h2>
                    <ul>
                        <li>Calendar</li>
                        <li>Google Calendar</li>
                        <li>Weather</li>
                        <li>Life Progress Bar</li>
                        <li>Countdown Timer</li>
                        <li>Button</li>
                        <li>Image Gallery (Not Dynamic)</li>
                        <li>Newsletter</li>
                        <li>Pomodoro Timer</li>
                    </ul>
                    <h2>More Advanced</h2>
                    <ul>
                        <li>Recurring Pages</li>
                        <li>Google Calendar Add Task</li>
                        <li>Feedback</li>
                        <li>Page Analytics</li>
                        <li>Heatmap Tracker</li>
                        <li>Like Button</li>
                        <li>Page Views</li>
                        <li>Upvote Button</li>
                    </ul>
                </Row>
            </Container>
        </>
    );
}

export default Landing;
