import React, { useState, useRef, useEffect } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { getCampScores, setCampScores } from '../../services/widgetsServices';
import HeaderComponent from '../../components/navigation/HeaderComponent';
import { Card } from 'react-bootstrap';

function selectOperator() {
    const operator = ['+', '-', '*', '/'];
    const opSelector = operator[Math.floor(4 * Math.random())];
    return opSelector;
}

function randomNumber(maxVal) {
    return Math.floor(maxVal * Math.random());
}

var mathItUp = {
    '+': function (x, y) {
        return x + y;
    },
    '-': function (x, y) {
        return x - y;
    },
    '*': function (x, y) {
        return x * y;
    },
    '/': function (x, y) {
        return x / y;
    },
};

function nextQuestion() {
    // Select Operator
    const operator = selectOperator();
    // Choose next numbers
    let n1 = randomNumber(25);
    let n2 = randomNumber(25);

    if (operator === '/') {
        while (n1 % n2 !== 0 || n1 === 0 || n2 === 0 || n2 === 1 || n1 === n2) {
            n1 = randomNumber(50);
            n2 = randomNumber(10);
        }
    } else if (operator === '*') {
        n1 = randomNumber(10);
        n2 = randomNumber(10);
        while (n1 === 0 || n2 === 0 || n1 === 1 || n2 === 1) {
            n1 = randomNumber(10);
            n2 = randomNumber(10);
        }
    } else {
        // For addition and subtraction
        while (n1 < n2 || n1 === 0 || n2 === 0 || n1 === n2) {
            n1 = randomNumber(25);
            n2 = randomNumber(25);
        }
    }

    // Figure out answer
    const answer = mathItUp[operator](n1, n2);

    // Create question ...
    const questionString = n1 + operator + n2;

    // ... and display it in the question box
    return [answer, questionString];
}

function QuickMaths() {
    const [game, setGame] = useState(false);
    // Need to set this back to p1
    const [phase, setPhase] = useState('p1');
    // For Game
    const [team, setTeam] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [inputAnswer, setInputAnswer] = useState('');
    const [teamScore, setTeamScore] = useState(0);
    const [amountCorrect, setAmountCorrect] = useState(0);
    const amountCorrectRef = useRef(amountCorrect);
    amountCorrectRef.current = amountCorrect;

    const [question, setQuestion] = useState('');

    const handleTeamSelect = e => {
        e.preventDefault();
        setPhase('p2');
    };

    const startGame = e => {
        e.preventDefault();
        setPhase('p3');
        setGame(true);
        const [answer, questionString] = nextQuestion();
        setQuestion(questionString);
        // Track score properly
        setCorrectAnswer(answer);

        // Ending Game
        setTimeout(() => {
            endGame();
        }, 60000);
    };

    async function endGame() {
        setPhase('p4');
        // Need to update scores properly
        /*
            TeamOne = Kids & TeamTwo = Parents
            Grab Final Score using amountCorrect
            Use updateScores to push appropriate score to approriate team 
        */

        const finalScores = await getCampScores();
        setTeamScore(finalScores[0][team] + amountCorrectRef.current);
        const scoreOfSelectedTeam =
            finalScores[0][team] + amountCorrectRef.current;

        // Set new camp scores
        await setCampScores(team, scoreOfSelectedTeam);
    }

    const checkQuestion = () => {
        if (!correctAnswer) {
            return null;
        }
        if (inputAnswer == correctAnswer) {
            setAmountCorrect(amountCorrect + 1);
        }
        const [answer, questionString] = nextQuestion();
        setQuestion(questionString);
        setCorrectAnswer(answer);
        setInputAnswer('');
    };

    // Handle Submit of creating a new game
    function createNewGame(e) {
        e.preventDefault();
        console.log('Creating New Game');

        setPhase('p2 - create game');
    }

    // Handle Submit of joining a game
    function joinGame(e) {
        e.preventDefault();
        console.log('Joining Game');
        setPhase('p2 - join game');
    }

    return (
        <>
            <HeaderComponent />
            {/* Phase 1 - Create or Join Game */}
            {phase === 'p1' && (
                <Container className="px-4">
                    <h1>Quick Maths</h1>
                    <Row xs={1} md={2} className="justify-content-around">
                        <Col md={4}>
                            <h2>Create new Game</h2>
                            <Form onSubmit={createNewGame}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formName"
                                >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Name"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Create Game
                                </Button>
                            </Form>
                        </Col>
                        <hr className="my-3 d-block d-sm-none" />
                        <Col md={4}>
                            <h2>Join Game</h2>
                            <Form onSubmit={joinGame}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formJoinCode"
                                >
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter 4-Letter Code"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formName"
                                >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Name"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Join Game
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )}

            {phase === 'p2 - create game' && (
                <Container className="d-flex">
                    <Row className="flex-grow-1">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Create Game</Card.Title>
                                    <Card.Text>
                                        <Form onSubmit={createNewGame}>
                                            <Form.Group
                                                as={Row}
                                                className="mb-3"
                                                controlId="formHorizontalCode"
                                            >
                                                <Form.Label column sm={2}>
                                                    Code
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="CODE"
                                                        disabled
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group
                                                as={Row}
                                                className="mb-3"
                                                controlId="formHorizontalEmail"
                                            >
                                                <Form.Label column sm={2}>
                                                    Seconds
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Number of Seconds"
                                                        disabled
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group
                                                as={Row}
                                                className="mb-3"
                                                controlId="formHorizontalPassword"
                                            >
                                                <Form.Label column sm={2}>
                                                    # Of Teams
                                                </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Number of Teams"
                                                        disabled
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <fieldset>
                                                <Form.Group
                                                    as={Row}
                                                    className="mb-3"
                                                >
                                                    <Form.Label
                                                        as="legend"
                                                        column
                                                        sm={2}
                                                    >
                                                        Difficulty
                                                    </Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Check
                                                            type="radio"
                                                            label="Level 1"
                                                            name="formHorizontalRadios"
                                                            id="formHorizontalRadios1"
                                                            disabled
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label="Level 2"
                                                            name="formHorizontalRadios"
                                                            id="formHorizontalRadios2"
                                                            disabled
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label="Level 3"
                                                            name="formHorizontalRadios"
                                                            id="formHorizontalRadios3"
                                                            disabled
                                                        />
                                                    </Col>
                                                </Form.Group>
                                            </fieldset>

                                            <Form.Group
                                                as={Row}
                                                xs="auto"
                                                className="mb-3 justify-content-start"
                                            >
                                                <Col sm={{ offset: 2 }}>
                                                    <Button type="submit">
                                                        Create Game
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button type="submit">
                                                        Share Code
                                                    </Button>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}

            {phase === 'p2 - join game' && (
                <Container className="d-flex">
                    <Row className="flex-grow-1">
                        <Col>
                            <Card className="">
                                <Card.Body>
                                    <Card.Title>CODE</Card.Title>
                                    <Card.Text>
                                        <ul>
                                            <li>Name</li>
                                            <li>Name</li>
                                            <li>Name</li>
                                            <li>Name</li>
                                            <li>Name</li>
                                            <li>Name</li>
                                        </ul>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default QuickMaths;
