import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddMessage() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle the form submission here
    console.log('Message:', message);
    console.log('Name:', name);

    setMessage('');
    setName('');
    alert(`Not set up yet. message: ${message} name: ${name}`);
  };

  return (
    <div className='bg-black text-green-500 h-screen flex flex-col justify-center items-center'>
      <div className='flex gap-4'>
        <Link to='/'>
          <h1 className='text-2xl font-bold mb-4 bg-white text-black p-2 rounded-md'>
            Homepage
          </h1>
        </Link>
        <Link to='/donate'>
          <h1 className='text-2xl font-bold mb-4 bg-white text-black p-2 rounded-md'>
            Donate to David's Birthday Fund
          </h1>
        </Link>
      </div>
      <h2>
        This is a virtual birthday card for David. Write a message below.
        Messages can be anonymous if you'd like. I have to manually add these
        messages to the matrix so it may take time to see it on the homepage.
        However you can preview your message
      </h2>
      <p className='underline text-white'>
        All messages are public and viewable by everyone.
      </p>
      <form
        className='flex flex-col w-full px-4 md:w-2/3'
        onSubmit={handleSubmit}
      >
        <label className='mb-2' htmlFor='message'>
          Message:
        </label>
        <textarea
          className='mb-4 p-2 w-full text-black rounded-md'
          id='message'
          name='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <label className='mb-2' htmlFor='name'>
          Name (optional):
        </label>
        <input
          className='mb-4 p-2 w-full rounded-md text-black'
          id='name'
          name='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className='flex gap-4 justify-center'>
          <button
            type='submit'
            className='bg-green-500 p-2 rounded-md text-black'
          >
            Submit Message
          </button>
          <button type='button' className='bg-white p-2 rounded-md text-black'>
            Preview
          </button>
        </div>
      </form>
    </div>
  );
}
