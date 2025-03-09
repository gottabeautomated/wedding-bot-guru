
import React, { useState, useEffect } from 'react';

interface WeddingCountdownProps {
  date: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const WeddingCountdown: React.FC<WeddingCountdownProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(date).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    
    return () => clearInterval(timer);
  }, [date]);
  
  return (
    <div className="text-center">
      <div className="flex justify-center gap-4 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-lg bg-telegram-blue text-white flex items-center justify-center text-2xl font-bold animate-pulse-subtle">
            {timeLeft.days}
          </div>
          <p className="text-xs mt-1 text-gray-600">Tage</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-lg bg-telegram-blue/90 text-white flex items-center justify-center text-2xl font-bold animate-pulse-subtle">
            {timeLeft.hours}
          </div>
          <p className="text-xs mt-1 text-gray-600">Stunden</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-lg bg-telegram-blue/80 text-white flex items-center justify-center text-2xl font-bold animate-pulse-subtle">
            {timeLeft.minutes}
          </div>
          <p className="text-xs mt-1 text-gray-600">Minuten</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-600">bis zu eurer Hochzeit</p>
    </div>
  );
};
