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
// Navigation
import WidgetOutletComponent from './components/navigation/WidgetOutletComponent';
import LiveOutletComponent from './components/navigation/LiveOutletComponent';
import ConfigureOutletComponent from './components/navigation/ConfigureOutletComponent';
// Styles
import './styles/App.css';

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <ConfigureOutletComponent />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="widget" element={<WidgetOutletComponent />}>
                        {/* Public Paths */}
                        <Route path="live" element={<LiveOutletComponent />}>
                            <Route
                                path="quotes/:widgetid"
                                element={<Quotes />}
                            />
                            <Route
                                path="cta/:widgetid"
                                element={<CTATrainTracker />}
                            />
                            <Route
                                path="clock/:widgetid"
                                element={<ClockWidget />}
                            />
                            <Route
                                path="characterCounter/:widgetid"
                                element={<CharacterCounter />}
                            />
                        </Route>
                        {/* These will need to be private paths */}
                        <Route
                            path="configure"
                            // element={<ConfigureOutletComponent />}
                            element={<ProtectedRoute isAllowed={true} />}
                        >
                            <Route
                                path="quotes/:widgetid"
                                element={<Quotes />}
                            />
                            <Route
                                path="cta/:widgetid"
                                element={<CTATrainTracker />}
                            />
                            <Route
                                path="clock/:widgetid"
                                element={<ClockWidget />}
                            />
                            <Route
                                path="characterCounter/:widgetid"
                                element={<CharacterCounter />}
                            />
                        </Route>
                    </Route>

                    {/* Public Paths */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Landing />} />

                    {/* Catch All */}
                    <Route path="*" element={<NotFoundView />} />

                    {/* Remove after Creation of user account and whatnot */}
                    <Route path="/Quotes" element={<Quotes />} />
                    <Route path="/CTA" element={<CTATrainTracker />} />
                    <Route path="/clock" element={<ClockWidget />} />
                    <Route
                        path="/characterCounter"
                        element={<CharacterCounter />}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
