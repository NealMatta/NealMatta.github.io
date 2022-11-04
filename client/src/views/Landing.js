import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <Container>
            <Row>
                <h1>Home</h1>
                <Link to="/characterCounter">Character Counter</Link>
                <Link to="/quotes">Quotes</Link>
                <Link to="/CTA">CTA API</Link>
                <Link to="/clock">Clock</Link>
                {/* <Link to="/GoogleCalendarAddTask">
                    Google Calendar Add Task
                </Link> */}

                <h1>Coming Soon</h1>
                <h2>Simple</h2>
                <ul>
                    <li>Clock (Multiple Variations)</li>
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
    );
}

export default Landing;
