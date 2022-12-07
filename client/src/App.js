import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
// Views
import Landing from '../src/views/Landing';
import Quotes from '../src/views/Quotes';
import CTATrainTracker from '../src/views/CTATrainTracker';
import CharacterCounter from '../src/views/characterCounter';
import GoogleCalendarAddTask from '../src/views/GoogleCalendarAddTask';
import ClockWidget from '../src/views/ClockWidget';
import Register from './components/accounts/Register';
import Login from './components/accounts/Login';
import ErrorMessage from './components/layouts/ErrorMessage';
// Styles
import './styles/App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <ErrorMessage />
                <Routes>
                    <Route path="/Quotes" element={<Quotes />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/CTA" element={<CTATrainTracker />} />
                    <Route path="/clock" element={<ClockWidget />} />
                    <Route
                        path="/GoogleCalendarAddTask"
                        element={<GoogleCalendarAddTask />}
                    />
                    <Route
                        path="/characterCounter"
                        element={<CharacterCounter />}
                    />
                    <Route path="/" element={<Landing />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
