import React, { useState, useRef, useEffect } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { getCampScores, setCampScores } from '../../services/widgetsServices';
import HeaderComponent from '../../components/navigation/HeaderComponent';
import { Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { BsArrowClockwise } from 'react-icons/bs';

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
    const [phase, setPhase] = useState('p1');
    // For Game
    const [team, setTeam] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [inputAnswer, setInputAnswer] = useState('');
    const [teamScore, setTeamScore] = useState(0);
    const [amountCorrect, setAmountCorrect] = useState(0);
    const amountCorrectRef = useRef(amountCorrect);
    amountCorrectRef.current = amountCorrect;
    // Game Status refers to whether the game has been initialized yet
    const [gameSetupStatus, setGameSetupStatus] = useState(false);
    // Code for the game
    const [code, setCode] = useState('0000');
    // Player ready status for when they're joining a game
    const [playerReady, setPlayerReady] = useState(false);

    const [question, setQuestion] = useState('');

    /* Functionality
    - Calculates the user's score
    - Adds the user's score to the assigned team */
    async function endGame() {
        setPhase('p4');
        // Need to update scores properly
        /*
            TeamOne = Kids & TeamTwo = Parents
            Grab Final Score using amountCorrect
            Use updateScores to push appropriate score to approriate team 
        */

        setTeamScore(amountCorrectRef.current);

        // EVERYTHING BELOW IS USING CAMP SCORE DATA. WRONG BAD NO NO
        // hehe but actually I can work with it to pass information in

        // const finalScores = await getCampScores();
        // setTeamScore(finalScores[0][team] + amountCorrectRef.current);
        // const scoreOfSelectedTeam =
        //     finalScores[0][team] + amountCorrectRef.current;

        // // Set new camp scores
        // await setCampScores(team, scoreOfSelectedTeam);
    }

    // If the question is correct, add a point. Regardless, get the next question rolling
    function checkQuestion() {
        if (!correctAnswer) {
            return null;
        }
        if (inputAnswer == correctAnswer) {
            setAmountCorrect(amountCorrect + 1);
        }
        const [answer, questionString] = nextQuestion();
        setQuestion(questionString);
        setCorrectAnswer(answer);
        // Resetting input value
        setInputAnswer('');
    }

    // Creates a new room for users to join
    function createNewGame(e) {
        e.preventDefault();
        console.log('Creating New Game');
        setPhase('p2 - create game');

        setCode(createCode());
        // Will need to check that the code is unique
        // Create an instance in the collection
    }

    // After a room is created, this function handles the settings
    function initializeGame(e) {
        e.preventDefault();
        console.log('Game being initialized');
        setGameSetupStatus(true);
        // Sets the settings for the game using the code
    }

    // When a user joins a room
    function joinGame(e) {
        e.preventDefault();
        console.log('Joining Game');
        setPhase('p2 - join game');
        // Can't create a game and then join it
        setGameSetupStatus(false);

        // Look for the game via the code given
    }

    // Handle Submit of starting your turn
    function startYourTurn(e) {
        e.preventDefault();
        setPhase('p3');
        const [answer, questionString] = nextQuestion();
        setQuestion(questionString);
        // Track score properly
        setCorrectAnswer(answer);

        // Ending Game
        setTimeout(() => {
            endGame();
        }, 10000);
    }

    function createCode() {
        let result = '';
        const characters = 'abcedfghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 4) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
            counter += 1;
        }
        return result.toUpperCase();
    }

    // Helper Function to identify when a joined user can start their turn
    function canPlayerBegin() {
        return gameSetupStatus && playerReady;
    }

    // Helper function to alert the game admin that a team has been selected
    function readyUp(e) {
        e.preventDefault();
        setPlayerReady(true);
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
                                <Card.Header>Create Game</Card.Header>
                                <Card.Body>
                                    <Card.Title>Code: {code}</Card.Title>
                                    <hr />
                                    <Card.Text>
                                        <Form onSubmit={initializeGame}>
                                            <h4>Game Settings</h4>

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
                                                        placeholder="60"
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
                                                        placeholder="2"
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
                                                    <Button
                                                        type="submit"
                                                        variant="success"
                                                    >
                                                        Initialize Game
                                                    </Button>
                                                </Col>
                                                {/* Need a confirmation of game created with these settings */}
                                            </Form.Group>
                                        </Form>
                                        <Form>
                                            <Form.Group
                                                as={Row}
                                                xs="auto"
                                                className="mb-3 justify-content-start"
                                            >
                                                <Col sm={{ offset: 2 }}>
                                                    <Button
                                                        type="submit"
                                                        disabled
                                                    >
                                                        Share Code
                                                    </Button>
                                                </Col>
                                                <Col></Col>
                                            </Form.Group>
                                        </Form>
                                        <Form onSubmit={startYourTurn}>
                                            <Form.Group
                                                as={Row}
                                                xs="auto"
                                                className="mb-3"
                                            >
                                                <Col sm={{ offset: 2 }}>
                                                    <Button
                                                        type="submit"
                                                        variant="success"
                                                        disabled={
                                                            !gameSetupStatus
                                                        }
                                                    >
                                                        Start Your Turn
                                                    </Button>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    <span onClick={() => setPhase('p1')}>
                                        <FaArrowLeft /> Go Back
                                    </span>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}

            {phase === 'p2 - join game' && (
                <Container className="d-flex">
                    <Row className="flex-grow-1">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>CODE</Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <h1>Select Team</h1>
                                            <Form onSubmit={readyUp}>
                                                <Form.Control
                                                    as="select"
                                                    className="rounded-0 mb-3"
                                                >
                                                    <option
                                                        className="d-none"
                                                        value=""
                                                    >
                                                        Select Option
                                                    </option>
                                                    {['1', '2'].map(option => (
                                                        <option key={option}>
                                                            Team {option}
                                                        </option>
                                                    ))}
                                                </Form.Control>

                                                <Form.Group as={Row}>
                                                    <Col>
                                                        <Button type="submit">
                                                            Ready
                                                        </Button>
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </Row>
                                        <hr></hr>
                                        <Row>
                                            <h1>Joined</h1>
                                        </Row>

                                        <Row xs="auto">
                                            <Col>
                                                <h2>Team 1</h2>
                                                <ul>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                </ul>
                                            </Col>
                                            <Col>
                                                <h2>Team 2</h2>
                                                <ul>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                    <li>Name</li>
                                                </ul>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Form onSubmit={startYourTurn}>
                                                <Form.Group
                                                    as={Row}
                                                    xs="auto"
                                                    className="mb-3"
                                                >
                                                    <Col sm={{}}>
                                                        <Button
                                                            type="submit"
                                                            variant="success"
                                                            disabled={
                                                                !canPlayerBegin()
                                                            }
                                                        >
                                                            Start Your Turn
                                                        </Button>
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    <span onClick={() => setPhase('p1')}>
                                        <FaArrowLeft /> Go Back
                                    </span>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}

            {/* Phase 3 - Game happening */}
            {phase === 'p3' && (
                <Container className="w-90 border p-5">
                    <Col>
                        <Row>Correct Answers: {amountCorrect}</Row>
                        <Row className="border my-2 p-3 justify-content-center">
                            {question}
                        </Row>
                        <Row className="text-start">
                            <Col>
                                <Form.Control
                                    size="lg"
                                    type="number"
                                    placeholder="Large text"
                                    value={inputAnswer}
                                    onChange={e =>
                                        setInputAnswer(e.target.value)
                                    }
                                />
                            </Col>
                            <Col>
                                <Button onClick={() => checkQuestion()}>
                                    Check
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            )}
            {/* Phase 4 - Game is complete */}
            {phase === 'p4' && (
                <Container>
                    <h1>Complete</h1>
                    <h3>You answered {amountCorrect}</h3>
                    <span onClick={() => setPhase('p1')}>
                        <BsArrowClockwise /> Run it Back
                    </span>
                </Container>
            )}
        </>
    );
}

export default QuickMaths;
