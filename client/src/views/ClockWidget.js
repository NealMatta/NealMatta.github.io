import React, { useEffect, useState } from 'react';

function ClockWidget() {
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);

    function currentTime() {
        const rightNow = new Date();
        setTime(rightNow.toLocaleTimeString());
        setDate(rightNow.toLocaleDateString());
    }

    useEffect(() => {
        setInterval(currentTime, 1000);
    }, []);

    return (
        <div>
            <div id="time">{time}</div>
            <div id="date">{date}</div>
        </div>
    );
}

export default ClockWidget;
