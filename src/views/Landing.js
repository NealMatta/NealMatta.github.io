import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Landing() {
	return (
		<Container>
			<Row className="justify-content-center align-self-center">
				<h1>Home</h1>
                <Link to="/characterCounter">Character Counter</Link> <br />
                <Link to="/quotes">Quotes</Link><br />
                <Link to="/CTAapi">CTA API</Link>

			</Row>
		</Container>
	);
}

export default Landing;