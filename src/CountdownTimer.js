import React from "react";
import Countdown from 'react-countdown';

export default function CountdownTimer() {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <></>;
        } else {
            // Render a countdown
            return <div className="countdown-container"> 
                <div>
                    <h3>{days}</h3>
                    <p>DAYS</p>
                </div>
                <div><h3>{hours}</h3>
                    <p>HOURS</p></div><div><h3>{minutes}</h3><p>MINS</p></div><div><h3>{seconds}</h3><p>SECS</p></div></div>;
        }
    };
    
    return <Countdown date={1691823600000} renderer={renderer}/>
}