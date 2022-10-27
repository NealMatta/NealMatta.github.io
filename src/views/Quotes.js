import React, { useEffect } from "react";
import "../styles/quotes.scss"

// import { Container, Row, Col } from "react-bootstrap";

function Quotes() {
	const quotes = [
		[
			"Passion for your work is a little bit of discovery, followed by a lot of development, and then a lifetime of deepening",
			"- Grit, Angela Duckworth",
		],
		[
			"A ship in a harbor is safe. But that's not what ships are meant for",
			"- John Shedd",
		],
		[
			"Talent is a pursued interest. In other words, anything that you're willing to practice, you can do",
			"- Bob Ross",
		],
		[
			"To trust is to be vulnerable and to be vulnerable is to trust",
			"- Dare To Lead, Brené Brown",
		],
		[
			"Greatness is many, many individual feats and each of them doable",
			"- Grit, Angela Duckworth",
		],
		[
			"Vulnerability is having the courage to show up, even when you can't control the outcome",
			"- Dare to Lead, Brené Brown",
		],
		[
			"Our potential is one thing. What we do with it is another",
			"- Grit, Angela Duckworth",
		],
		[
			"Lazy people do a little work and think they should be winning but winners do a lot of work and still worry about being lazy",
			"- Anonymous",
		],
		["Comparison is the thief of joy", "- Anonymous"],
	];

	const INTERVAL = 3600000;

	function displayQuote(quoteNumber) {
		let q = quotes[quoteNumber][0];
		let s = quotes[quoteNumber][1];

		document.getElementById("quote").innerHTML = q;
		document.getElementById("speaker").innerHTML = s;
	}

	function displayWidget() {
		let quoteNumber = Math.floor(Math.random() * quotes.length);
		displayQuote(quoteNumber);
	}

	useEffect(() => {
		displayWidget();
		setInterval(displayWidget, INTERVAL);
	})
	return (
		<div className="quotes widget leftLine">
            <div className="quote" id="quote">test</div>
            <div className="speaker" id="speaker">test</div>
        </div>
	);
}

export default Quotes;