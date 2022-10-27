import React, { useEffect } from "react";

function CharacterCounter() {
    function countCharacters(){
        document.getElementById("textarea").onkeyup = function () {
            document.getElementById("count").innerHTML =
                "Characters left: " + (280 - this.value.length);
        };
    }
    useEffect(() => {
        countCharacters();
    })
	return (
		<div class="widget">
            <textarea id="textarea" rows="5" cols="50"></textarea>
            <h3 id="count"></h3>
        </div>
	);
}

export default CharacterCounter;