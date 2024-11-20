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
  const randomIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const decodeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalDecodingTime = 2000; // Total time to decode the message in milliseconds
  const randomLetterInterval = 100; // Interval for generating random letters in milliseconds

  useEffect(() => {
    const message = messages[currentMessage];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Characters to use for random text
    let randomTextArray = message.message
      .split('')
      .map((char) =>
        char === ' ' ? ' ' : letters[Math.floor(Math.random() * letters.length)]
      ); // Initialize with random letters or spaces

    const decodeSpeed = totalDecodingTime / message.message.length; // Calculate decoding speed
    let position = 0;

    const generateRandomLetters = () => {
      randomIntervalRef.current = setInterval(() => {
        randomTextArray = randomTextArray.map((_char, index) => {
          if (index < position) {
            return message.message[index] === ' '
              ? ' '
              : message.message[index];
          } else {
            if (message.message[index] === ' ') {
              return ' ';
            }
            return letters[Math.floor(Math.random() * letters.length)];
          }
        });
        setDisplayText(randomTextArray.join(''));
      }, randomLetterInterval);
    };

    const decodeMessage = () => {
      decodeIntervalRef.current = setInterval(() => {
        if (position < message.message.length) {
          randomTextArray[position] = message.message[position];
          position++;
          setDisplayText(randomTextArray.join(''));
        } else {
          // set message to the full decoded message
          setDisplayText(message.message);
          clearInterval(decodeIntervalRef.current as NodeJS.Timeout);
          clearInterval(randomIntervalRef.current as NodeJS.Timeout);
          // Move to the next message after decoding ends
          setTimeout(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
            setDisplayText('');
            setDisplayName('');
          }, 2000); // Delay before the next message starts
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
        <p className='whitespace-pre-wrap break-words'>{displayText}</p>
      </div>
      <span className='text-gray-500'>{displayName}</span>
      <div className='flex gap-3'>
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default MatrixMessageEffect;
