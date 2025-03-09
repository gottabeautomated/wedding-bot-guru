
import React from 'react';

interface TelegramInlineKeyboardProps {
  buttons: string[];
}

export const TelegramInlineKeyboard: React.FC<TelegramInlineKeyboardProps> = ({ buttons }) => {
  return (
    <div className="telegram-keyboard">
      {buttons.map((button, index) => (
        <button 
          key={index} 
          className="telegram-keyboard-button"
        >
          {button}
        </button>
      ))}
    </div>
  );
};
