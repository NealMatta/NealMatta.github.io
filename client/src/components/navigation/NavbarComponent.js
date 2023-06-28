import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

function NavbarComponent() {
    const { currentUser, logout } = useAuth();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    function checkIfUser() {
        if (currentUser) {
            setUserLoggedIn(true);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await logout();
            setUserLoggedIn(false);
            navigate('/');
        } catch {
            console.log("Couldn't Log Out");
        }
    }

    useEffect(() => {
        checkIfUser();
    }, [currentUser]);

    return (
        <Navbar expand="lg" bg="light">
            <Container>
                <Link to="/" className="navbar-brand">
                    <Navbar.Brand>Neal's Playground</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse className="justify-content-end">
                    {userLoggedIn && (
                        <Button variant="danger" onClick={handleSubmit}>
                            Log Out
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
