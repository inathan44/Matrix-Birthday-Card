import React from 'react';

interface MessageDisplayProps {
  messages: string[];
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages }) => {
  return (
    <div className='relative z-10 p-4 text-green-500 text-xl font-mono space-y-4'>
      {messages.map((message, index) => (
        <div
          key={index}
          className='animate-slide-in mb-2'
          style={{ animationDelay: `${index * 2}s` }}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
