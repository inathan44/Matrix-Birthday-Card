import { useEffect, useRef, useState } from 'react';
import { Message } from '../App';
import { Button } from './ui/button';

interface MatrixMessageEffectProps {
  messages: Message[];
}

const MatrixMessageEffect: React.FC<MatrixMessageEffectProps> = ({
  messages,
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayText, setDisplayText] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(true); // State to control play/pause
  const randomIntervalRef = useRef<
    NodeJS.Timeout | number | undefined | string
  >(undefined);
  const decodeIntervalRef = useRef<
    NodeJS.Timeout | number | undefined | string
  >(undefined);

  const totalDecodingTime = 2000; // Total time to decode the message in milliseconds
  const randomLetterInterval = 80; // Interval for generating random letters in milliseconds

  useEffect(() => {
    const message = messages[currentMessage];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Characters to use for random text
    let decodedText = ''; // String to hold the decoded part of the message
    let randomText = ''; // String to hold the random letters

    const decodeSpeed = Math.min(
      8000,
      totalDecodingTime / message.message.length
    ); // Calculate decoding speed
    let position = 0;

    const generateRandomLetters = () => {
      randomIntervalRef.current = setInterval(() => {
        randomText = Array(message.message.length - position)
          .fill('')
          .map(() => letters[Math.floor(Math.random() * letters.length)])
          .join('');
        setDisplayText(decodedText + randomText);
      }, randomLetterInterval);
    };

    const decodeMessage = () => {
      decodeIntervalRef.current = setInterval(() => {
        if (position < message.message.length) {
          decodedText +=
            message.message[position] === ' '
              ? '\u00A0'
              : message.message[position];
          position++;
        } else {
          clearInterval(decodeIntervalRef.current as NodeJS.Timeout);
          clearInterval(randomIntervalRef.current as NodeJS.Timeout);
          // Move to the next message after decoding ends
          setTimeout(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
            setDisplayText('');
            setDisplayName('');
          }, 200); // Delay before the next message starts
        }
      }, decodeSpeed);
    };

    if (message.from) {
      setDisplayName(` - ${message.from}`);
    }

    if (isPlaying) {
      generateRandomLetters();
      decodeMessage();
    } else {
      setDisplayText(message.message); // Show the full decoded message when paused
    }

    return () => {
      clearInterval(randomIntervalRef.current as NodeJS.Timeout);
      clearInterval(decodeIntervalRef.current as NodeJS.Timeout);
    };
  }, [currentMessage, messages, isPlaying]);

  const handlePrevious = () => {
    clearInterval(randomIntervalRef.current as NodeJS.Timeout);
    clearInterval(decodeIntervalRef.current as NodeJS.Timeout);
    setCurrentMessage((prev) => (prev - 1 + messages.length) % messages.length);
    setDisplayText('');
    setDisplayName('');
  };

  const handleNext = () => {
    clearInterval(randomIntervalRef.current as NodeJS.Timeout);
    clearInterval(decodeIntervalRef.current as NodeJS.Timeout);
    setCurrentMessage((prev) => (prev + 1) % messages.length);
    setDisplayText('');
    setDisplayName('');
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(randomIntervalRef.current as NodeJS.Timeout);
      clearInterval(decodeIntervalRef.current as NodeJS.Timeout);
      setDisplayText(messages[currentMessage].message); // Show the full decoded message
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className='relative z-10 text-green-500 text-2xl font-mono flex flex-col justify-center px-12 items-center'>
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
      <div className='flex gap-3'>
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handlePlayPause}>Play/Pause</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default MatrixMessageEffect;
