
import React from 'react';
import { motion } from 'framer-motion';

interface TelegramMessageProps {
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
  imageSrc?: string;
}

export const TelegramMessage: React.FC<TelegramMessageProps> = ({
  text,
  sender,
  timestamp,
  imageSrc
}) => {
  const messageClass = sender === 'bot' ? 'telegram-message-bot' : 'telegram-message-user';
  
  return (
    <div className={messageClass}>
      {imageSrc && (
        <div className="mb-2 rounded-lg overflow-hidden">
          <motion.img 
            src={imageSrc}
            alt="Message attachment"
            className="w-full h-auto object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
      
      <p className="whitespace-pre-line text-sm">{text}</p>
      <div className="text-right mt-1">
        <span className="text-xs text-gray-400">{timestamp}</span>
      </div>
    </div>
  );
};
