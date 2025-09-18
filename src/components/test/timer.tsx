import React, { useState, useEffect } from 'react';

interface TimerProps {
    startTime: string;
    endTime: string;
    onTimeEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ startTime, endTime,onTimeEnd }) => {
    const calculateRemainingTime = () => {
        const end = new Date(endTime).getTime();
        const now = new Date().getTime();
        return Math.max(0, end - now);
    };

    const [timer, setTimer] = useState(calculateRemainingTime());

    useEffect(() => {
        const interval = setInterval(() => {
            const remainingTime = calculateRemainingTime();
            setTimer(remainingTime);
            if (remainingTime === 0) {
                clearInterval(interval);
                onTimeEnd();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [endTime]);

    const formatTime = () => {
        const totalSeconds = Math.floor(timer / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return <h5 className={'font-medium'}> {formatTime()}</h5>;
};

export default Timer;
