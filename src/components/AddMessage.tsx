import Navbar from './Navbar';

export default function AddMessage() {
  document.title = 'Add a Message';

  return (
    <div className='bg-black text-green-500 min-h-screen flex flex-col justify-center items-center px-12 '>
      <div className='max-w-2xl space-y-6'>
        <Navbar />
        <h2 className='text-gray-400'>
          This is a virtual birthday card for David. Write a message below.
          Messages can be anonymous if you'd like, but they are public. you can
          preview your message.
        </h2>
        <p>
          Since it is past his bday, I have turned off the database so no new
          messages can be added. Thanks to everyone who added a message!
        </p>
      </div>
    </div>
  );
}
