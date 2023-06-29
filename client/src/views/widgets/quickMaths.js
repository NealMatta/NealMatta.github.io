import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

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
    const [amountCorrect, setAmountCorrect] = useState(0);
    const [question, setQuestion] = useState('');

    const handleTeamSelect = e => {
        e.preventDefault();
        setPhase('p2');
    };

    const startGame = e => {
        e.preventDefault();
        setPhase('p3');
        setGame(true);
        beginGame();
        setInterval(endGame, 10000);
    };

    function beginGame() {
        const [answer, questionString] = nextQuestion();
        setQuestion(questionString);
        // Track score properly
        setCorrectAnswer(answer);
    }

    function endGame() {
        setPhase('p4');
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

    const temp = () => {
        beginGame();
    };

    // Delete before final
    useEffect(temp, []);

    return (
        <div className="widget">
            <Container className="text-center">
                {!game && (
                    <>
                        {/* Phase 1 - Select Teams*/}
                        <Form onSubmit={handleTeamSelect}>
                            <Form.Group
                                onChange={value => {
                                    setTeam(value.target.id);
                                }}
                            >
                                <Form.Check
                                    disabled={phase !== 'p1'}
                                    inline
                                    label="Kids"
                                    name="teamSelect"
                                    type="radio"
                                    id="teamOne"
                                />
                                <Form.Check
                                    disabled={phase !== 'p1'}
                                    inline
                                    label="Parents"
                                    name="teamSelect"
                                    type="radio"
                                    id="teamTwo"
                                />
                            </Form.Group>

                            <Button
                                disabled={phase !== 'p1'}
                                variant="primary"
                                type="submit"
                            >
                                Next
                            </Button>
                        </Form>
                        {/* Phase 2 - Instructions*/}
                        {phase === 'p2' && (
                            <>
                                <Col className="mt-3">
                                    <Row>
                                        <p>
                                            You'll have 60 seconds to answer as
                                            many math questions as you can.
                                            Click Start below to begin
                                        </p>
                                        <Button onClick={startGame}>
                                            Start Game
                                        </Button>
                                    </Row>
                                </Col>
                            </>
                        )}
                    </>
                )}

                {/* Phase 3 */}
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
                {phase === 'p4' && (
                    <Container>
                        <h1>Complete</h1>
                        <h3>You answered {amountCorrect}</h3>
                    </Container>
                )}
            </Container>
        </div>
    );
}

export default QuickMaths;
