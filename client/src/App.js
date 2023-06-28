import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
// Views
import Landing from '../src/views/Landing';
import Register from '../src/views/accounts/Register';
import Login from '../src/views/accounts/Login';
import NotFoundView from './views/NotFoundView';
// Widgets
import Quotes from '../src/views/widgets/Quotes';
import CTATrainTracker from '../src/views/widgets/CTATrainTracker';
import CharacterCounter from './views/widgets/characterCounter';
import ClockWidget from '../src/views/widgets/ClockWidget';

// FUTURE - LOOK INTO DELETING THE OUTLETS
// Navigation
// import WidgetOutletComponent from './components/navigation/WidgetOutletComponent';
// import LiveOutletComponent from './components/navigation/LiveOutletComponent';
// import ConfigureOutletComponent from './components/navigation/ConfigureOutletComponent';
// Styles
import './styles/App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/notFound" element={<NotFoundView />} />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/cta" element={<CTATrainTracker />} />
                    <Route path="/clock" element={<ClockWidget />} />
                    <Route
                        path="/characterCounter"
                        element={<CharacterCounter />}
                    />
                    {/* Catch All */}
                    <Route path="*" element={<NotFoundView />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
