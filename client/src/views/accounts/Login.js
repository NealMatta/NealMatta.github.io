import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import HeaderComponent from '../../components/navigation/HeaderComponent';

export default function Login() {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { currentUser, login } = useAuth();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (e) {
            setError('Failed to login');
        }

        setLoading(false);
    }

    return (
        <>
            <HeaderComponent />
            <Container>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    ref={emailRef}
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordRef}
                                    required
                                />
                            </Form.Group>
                            <Button
                                disabled={loading}
                                className="w-100"
                                type="submit"
                            >
                                Log In
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/register">Sign Up</Link>
                </div>
            </Container>
        </>
    );
}
