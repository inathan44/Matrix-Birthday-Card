import React, { useEffect, useState } from 'react';
import { Message } from '../App';

interface MatrixMessageEffectProps {
  messages: Message[];
}

const MatrixMessageEffect: React.FC<MatrixMessageEffectProps> = ({
  messages,
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayText, setDisplayText] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const totalDecodingTime = 2000; // Total time to decode the message in milliseconds
  const randomLetterInterval = 80; // Interval for generating random letters in milliseconds

  useEffect(() => {
    const message = messages[currentMessage];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Characters to use for random text
    let decodedText = ''; // String to hold the decoded part of the message
    let randomText = ''; // String to hold the random letters
    let randomInterval: NodeJS.Timeout | number | undefined | string =
      undefined;
    let decodeInterval: NodeJS.Timeout | number | undefined | string =
      undefined;

    const decodeSpeed = Math.min(
      8000,
      totalDecodingTime / message.message.length
    ); // Calculate decoding speed
    let position = 0;

    const generateRandomLetters = () => {
      randomInterval = setInterval(() => {
        randomText = Array(message.message.length - position)
          .fill('')
          .map(() => letters[Math.floor(Math.random() * letters.length)])
          .join('');
        setDisplayText(decodedText + randomText);
      }, randomLetterInterval);
    };

    const decodeMessage = () => {
      decodeInterval = setInterval(() => {
        if (position < message.message.length) {
          decodedText +=
            message.message[position] === ' '
              ? '\u00A0'
              : message.message[position];
          position++;
        } else {
          clearInterval(decodeInterval);
          clearInterval(randomInterval);
          // Move to the next message after decoding ends
          setTimeout(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
            setDisplayText('');
            setDisplayName('');
          }, 3000); // Delay before the next message starts
        }
      }, decodeSpeed);
    };

    if (message.from) {
      setDisplayName(` - ${message.from}`);
    }

    generateRandomLetters();
    decodeMessage();

    return () => {
      clearInterval(randomInterval as NodeJS.Timeout);
      clearInterval(decodeInterval as NodeJS.Timeout);
    };
  }, [currentMessage, messages]);

  return (
    <div className='relative z-10 text-green-500 text-2xl font-mono flex flex-col justify-center px-12'>
      <span className='text-gray-500'>
        Message {currentMessage + 1} of {messages.length}
      </span>
      <div className='flex justify-center overflow-x-hidden text-ellipsis'>
        <div
          style={{
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
          }}
        >
          {displayText}
        </div>
      </div>
      <span className='text-gray-500'>{displayName}</span>
    </div>
  );
};

export default MatrixMessageEffect;
