import React, { useState } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function QuickMaths() {
    const [game, setGame] = useState(false);
    const [phase, setPhase] = useState('p1');
    // For Game
    const [team, setTeam] = useState(false);
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
    };
    return (
        <div className="widget">
            <Container className="text-center">
                <Container className="w-90 border p-5">
                    <Col>
                        <Row>Correct Answers: x/x</Row>
                        <Row className="border my-2 p-3 justify-content-center">
                            Question
                        </Row>
                        <Row className="text-start">
                            <Col>Input Value</Col>
                            <Col>
                                <Button>Check</Button>
                            </Col>
                        </Row>
                    </Col>
                </Container>
                {game && (
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
                {/* {phase === 'p3' && <h1>Phase 3</h1>} */}
            </Container>
        </div>
    );
}

export default QuickMaths;
