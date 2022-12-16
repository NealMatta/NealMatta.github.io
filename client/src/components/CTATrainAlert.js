import React from 'react';

function CTATrainAlert(props) {
    const fullArrivalTime = new Date(props.data.arrT);
    var today = new Date();
    const timeInMs = Math.abs(fullArrivalTime - today);

    var timeInMins = Math.round(timeInMs / 1000 / 60);

    if (timeInMins === 0 || timeInMins === 1) {
        timeInMins = 'Due';
    }
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
                    <span className="bold">{timeInMins}</span>
                    {timeInMins !== 'Due' && ' min'}
                </span>
            </div>
        </div>
    );
}

export default CTATrainAlert;
