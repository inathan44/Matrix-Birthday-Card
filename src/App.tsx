import React, { useRef, useEffect, useState } from 'react';
import MatrixEffect from './components/MatrixEffect';
import MatrixMessageEffect from './components/MatrixMessageEffect';

export type Message = {
  message: string;
  from?: string;
};

const App: React.FC = () => {
  const messages: Message[] = [
    // { message: 'Welcome to the Matrix, Crit.', from: 'Yan' },
    // { message: 'Follow the white rabbit.', from: 'Morpheus' },
    {
      message:
        'Happy birthday crit, I hope you have a wonderful day! You are so amazing and I hope you.',
      from: 'The Oracle',
    },
    { message: 'The choice is yours.', from: 'The Oracle' },
    // { message: 'The choice is yours.', from: 'The Oracle' },
    // { message: 'The choice is yours.', from: 'The Oracle' },
    // { message: 'The choice is yours.', from: 'The Oracle' },
    // { message: 'The choice is yours.', from: 'The Oracle' },
  ];

  const appRef = useRef<HTMLDivElement>(null);
  const [showMessages, setShowMessages] = useState(false); // State to control message visibility

  // Toggle Fullscreen mode on double click
  const handleDoubleClick = () => {
    if (!document.fullscreenElement) {
      if (appRef.current) {
        appRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
      }
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message}`
        );
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      window.dispatchEvent(new Event('resize'));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleRedPillClick = () => {
    // Handle Red Pill click
    setShowMessages(true); // Show messages after pill choice
  };

  return (
    <div
      className='relative h-screen overflow-hidden'
      ref={appRef}
      onDoubleClick={handleDoubleClick}
    >
      <MatrixEffect />
      {!showMessages && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-[0px]'>
          <div className='text-white text-2xl font-mono'>
            <h2 className='mb-4'>Choose your pill:</h2>
            <button
              className='bg-red-600 text-white py-2 px-4 rounded mr-4 transition hover:bg-red-500'
              onClick={handleRedPillClick}
            >
              Choose the Red Pill
            </button>
            <a
              href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-blue-600 text-white py-2 px-4 rounded mr-4 transition hover:bg-blue-500'
            >
              Choose the Blue Pill
            </a>
          </div>
        </div>
      )}
      {showMessages && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-[2px]'>
          <MatrixMessageEffect messages={messages} />
        </div>
      )}
    </div>
  );
};

export default App;
