import React from 'react';
import { useTimer } from 'react-timer-hook';
import './Timer.css'

function MyTimer({ expiryTimestamp }) {
	const {
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


	return (
		<div style={{ textAlign: 'center' }}>
			<div className="timer">
				TIME LEFT <br />
				<span>{minutes}</span> : <span>{seconds}</span>
			</div>
			{/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
			{/* <button onClick={start}>Start</button>
			<button onClick={pause}>Pause</button>
			<button onClick={resume}>Resume</button>
			<button onClick={() => {
				// Restarts to 5 minutes timer
				const time = new Date();
				time.setSeconds(time.getSeconds() + 300);
				restart(time)
			}}>Restart</button> */}
		</div>
	);
}

export default function Timer() {
	const time = new Date();
	time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
	return (
		<div>
			<MyTimer expiryTimestamp={time} />
		</div>
	);
}