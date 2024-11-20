import React, { useRef, useEffect, useState } from 'react';
import MatrixEffect from './components/MatrixEffect';
import MatrixMessageEffect from './components/MatrixMessageEffect';
import supabase from './supabaseConfig';
import {
  messagesResponse,
  MessagesResponseType,
} from './schemas/messagesResponse';
import { z } from 'zod';
import { cn } from './lib/utils';

export type Message = {
  message: string;
  from?: string;
};

const App: React.FC = () => {
  document.title = 'Happy Birthday David!';

  const appRef = useRef<HTMLDivElement>(null);
  const [showMessages, setShowMessages] = useState(false); // State to control message visibility
  const [fetchedMessages, setFetchedMessages] = useState<
    MessagesResponseType[]
  >([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await supabase.from('Messages').select('*');

      if (response.error) {
        console.error(
          'An error occurred while fetching messages:',
          response.error
        );
        return;
      }

      const result = z.array(messagesResponse).safeParse(response.data);
      if (result.error) {
        console.error('Validation failed:', result.error);
        return;
      }

      const messages: MessagesResponseType[] = result.data;
      setFetchedMessages(messages);
    }

    fetchMessages();
  }, []);

  const handleRedPillClick = () => {
    setShowMessages(true);
  };

  return (
    <div className='relative min-h-screen' ref={appRef}>
      <MatrixEffect />
      {!showMessages && (
        <div
          className={cn(
            'absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-[0px]',
            { 'backdrop-blur-[2px]': showMessages }
          )}
        >
          <div className='text-white text-2xl font-mono flex flex-col items-center gap-4'>
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
        <div className='absolute top-0 left-0 w-full h-full pt-24 pb-24 items-center justify-center bg-black bg-opacity-40 backdrop-blur-[2px] overflow-auto'>
          <MatrixMessageEffect messages={fetchedMessages} />
        </div>
      )}
    </div>
  );
};

export default App;
