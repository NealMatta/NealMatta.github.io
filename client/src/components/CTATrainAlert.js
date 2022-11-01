import React from 'react';

function CTATrainAlert(props) {
    const fullArrivalTime = new Date(props.data.arrT);
    var today = new Date();
    const timeInMs = Math.abs(fullArrivalTime - today);
    const timeInMins = Math.round(timeInMs / 1000 / 60);
    console.log(timeInMins);

    return (
        <div className="individualTrain">
            <div className="trainTitle">
                <span className="trainName">
                    {props.data.rt} Line #{props.data.rn} to
                </span>{' '}
                <br />
                <span className="trainDest">{props.data.destNm}</span>
            </div>
            <div className="trainTimeContainer">
                <span className="trainTime">
                    <span className="bold">{timeInMins}</span> min
                </span>
            </div>
            <div className="trainIcon"></div>
        </div>
    );
}

export default CTATrainAlert;
