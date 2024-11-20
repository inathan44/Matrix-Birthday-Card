import { useRef, useEffect, useState } from 'react';
import MatrixEffect from '@/components/MatrixEffect';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export type Message = {
  message: string;
  from?: string;
};

export default function Preview() {
  const appRef = useRef<HTMLDivElement>(null);
  const [previewMessage, setPreviewMessage] = useState<Message>({
    message: '',
  });

  useEffect(() => {
    const message = localStorage.getItem('previewMessage');
    if (message) {
      setPreviewMessage(JSON.parse(message));
    }
  }, []);

  return (
    <>
      <div className='relative h-screen overflow-hidden' ref={appRef}>
        <MatrixEffect />

        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-[2px] flex-col gap-4'>
          <Link to='/addnote'>
            <Button className='bg-white text-black hover:bg-gray-100'>
              Exit Preview
            </Button>
          </Link>
          <div className='relative z-10 text-green-500 text-2xl font-mono flex flex-col justify-center px-12 items-center'>
            <span className='text-gray-500'>
              Message {1} of {1}
            </span>
            <div className='flex justify-center overflow-x-hidden text-ellipsis'>
              <div
                style={{
                  wordWrap: 'break-word',
                  wordBreak: 'break-all',
                  whiteSpace: 'normal',
                }}
              >
                {previewMessage.message}
              </div>
            </div>
            <span className='text-gray-500'>{previewMessage.from}</span>
          </div>
        </div>
      </div>
    </>
  );
}
