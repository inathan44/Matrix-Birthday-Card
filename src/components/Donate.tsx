import { useState } from 'react';
import { Link } from 'react-router-dom';
import DonationPopUp from './DonationPopUp';

export default function Donate() {
  const [showDonation, setShowDonation] = useState(false);
  const handleDonationClick = () => {
    setShowDonation(!showDonation);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black text-green-500 p-4'>
      <div className='flex gap-4'>
        <Link to='/'>
          <h1 className='text-2xl font-bold mb-4 bg-white text-black p-2 rounded-md'>
            Homepage
          </h1>
        </Link>
        <Link to='/addnote'>
          <h1 className='text-2xl font-bold mb-4 bg-white text-black p-2 rounded-md'>
            Write a message
          </h1>
        </Link>
      </div>
      <h1 className='text-3xl font-bold mb-4'>
        Donate to David's Birthday Fund
      </h1>
      <p className='mb-6 text-lg text-center'>
        Donations are <span className='text-red-500'>completely optional</span>.
        How it will work is you will Venmo me (Ian) an amount UNDER $10. For
        accounting/tracking purposes,{' '}
        <span className='text-red-500 font-bold underline'>
          donations will not be anonymous so everyone is sure that all money is
          accounted for. I will not be taking a cut; all money will go to David
        </span>
        . Any amount over $10 will be refunded back to you. If you would rather
        Venmo him directly, his Venmo is [Friend's Venmo], and his birthday is
        [Friend's Birthday], so please send on that date. I have to manually
        update the webpage to show who donated, so it will take up to two days
        for you to see your donation reflected here. I will post a screenshot
        once all the money has been sent. My venmo is set to private so he does
        not see the donations (another reason donations are not anonymous).
      </p>

      {showDonation && <DonationPopUp />}
      {!showDonation && (
        <button
          onClick={handleDonationClick}
          className='bg-blue-600 text-white py-2 px-4 rounded transition hover:bg-blue-500'
        >
          Donate via Venmo
        </button>
      )}
    </div>
  );
}
