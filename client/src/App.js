import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Views
import Landing from '../src/views/Landing';
import Quotes from '../src/views/Quotes';
import CTATrainTracker from '../src/views/CTATrainTracker';
import CharacterCounter from '../src/views/characterCounter';
// Styles
import './styles/App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Quotes" element={<Quotes />} />
                <Route path="/CTA" element={<CTATrainTracker />} />
                <Route
                    path="/characterCounter"
                    element={<CharacterCounter />}
                />
            </Routes>
        </Router>
    );
}

export default App;
