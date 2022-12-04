import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import { useAuth } from "../contexts/AuthProvider";

function NavbarComponent() {
    // const { currentUser, logout } = useAuth();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    // function checkIfUser() {
    // 	if (currentUser) {
    // 		setUserLoggedIn(true);
    // 	}
    // }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            console.log('Logging Out');
            // await logout();
            // setUserLoggedIn(false);
            navigate('/');
        } catch {
            console.log("Couldn't Log Out");
            console.log('DO BETTER ERROR CHECKING');
        }
    }

    // useEffect(() => {
    // 	checkIfUser();
    // }, [currentUser]);

    return (
        <Navbar expand="lg" bg="light">
            <Container>
                <Link to="/" className="navbar-brand">
                    <Navbar.Brand>Notion Widgets</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse className="justify-content-end">
                    <Link to="/login">
                        <Button variant="outline-primary">Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="outline-primary" className="mx-1">
                            Signup
                        </Button>
                    </Link>
                    <Button variant="danger" onClick={handleSubmit}>
                        Log Out
                    </Button>
                    {/* {!userLoggedIn && (
                        <>
                            <Link to="/login">
                                <Button variant="outline-primary">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button
                                    variant="outline-primary"
                                    className="mx-1"
                                >
                                    Signup
                                </Button>
                            </Link>
                        </>
                    )} */}

                    {/* {userLoggedIn && (
                        <Button variant="danger" onClick={handleSubmit}>
                            Log Out
                        </Button>
                    )} */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
// (
// 	<Navbar expand="lg" light bgColor="light">
// 		<Container>
// 			<Link to="/" className="navbar-brand">
// 				<Navbar.Brand>Notion Widgets</Navbar.Brand>
// 			</Link>
// 			<Navbar.Toggle aria-controls="basic-navbar-nav" />

// 			<div className="m-auto">
// 				<Link to="/login">
// 					<Button variant="outline-primary">Create Widget</Button>
// 				</Link>
// 				<Link to="/login">
// 					<Button variant="outline-primary">My Widgets</Button>
// 				</Link>
// 			</div>

// 			<Navbar.Collapse className="justify-content-end">
// 				<Link to="/login">
// 					<Button variant="outline-primary">Login</Button>
// 				</Link>
// 				<Link to="/signup">
// 					<Button variant="outline-primary" className="mx-1">
// 						Signup
// 					</Button>
// 				</Link>
// 				<Button variant="danger" onClick={handleSubmit}>
// 					Log Out
// 				</Button>
// 				{/* {!userLoggedIn && (
// 					<>
// 						<Link to="/login">
// 							<Button variant="outline-primary">Login</Button>
// 						</Link>
// 						<Link to="/signup">
// 							<Button
// 								variant="outline-primary"
// 								className="mx-1"
// 							>
// 								Signup
// 							</Button>
// 						</Link>
// 					</>
// 				)} */}

// 				{/* {userLoggedIn && (
// 					<Button variant="danger" onClick={handleSubmit}>
// 						Log Out
// 					</Button>
// 				)} */}
// 			</Navbar.Collapse>
// 		</Container>
// 	</Navbar>
// );
