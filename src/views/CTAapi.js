import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function CTAapi() {
	console.log(process.env.REACT_APP_CTA_API)


	return (
		<Container fluid>
			<Row>
				<Col>
                    <h1>CTA API Pages</h1>
				</Col>
			</Row>
		</Container>
	);
}

export default CTAapi;