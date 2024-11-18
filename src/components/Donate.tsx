import { useState } from 'react';
import DonationPopUp from './DonationPopUp';
import Navbar from './Navbar';
import { Button } from './ui/button';

interface Donation {
  amount: number;
  from: string;
}

const donations: Donation[] = [
  { amount: 10, from: 'Ian' },
  { amount: 10, from: 'Oscar' },
  { amount: 5, from: 'Gabe' },
  { amount: 5, from: 'Ev Mays' },
];

export default function Donate() {
  document.title = "Donate to David's Birthday Gift Fund";

  const [showDonation, setShowDonation] = useState(false);
  const handleDonationClick = () => {
    setShowDonation(!showDonation);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white p-4'>
      <Navbar />
      <h1 className='text-3xl font-bold mb-4'>
        Donate to David's Birthday Fund
      </h1>
      <p className='mb-6 text-lg text-center'>
        Donations are completely optional. How it will work is you will Venmo me
        (Ian) an amount under $10. For accounting/tracking purposes, donations
        will not be anonymous so everyone is sure that all money is accounted
        for. I will not be taking a cut; all money will go to David . Any amount
        over $10 will be refunded back to you. If you would rather Venmo him
        directly, his Venmo is "@Devans_", and his birthday is 11/27, so please
        send on that date. I have to manually update the webpage to show who
        donated, so it will take up to two days for you to see your donation
        reflected here. I will post a screenshot once all the money has been
        sent. My venmo is set to private so he does not see the donations
        (another reason donations are not anonymous).
      </p>

      {showDonation && <DonationPopUp />}
      {!showDonation && (
        <Button
          onClick={handleDonationClick}
          className='bg-blue-600 text-white py-2 px-4 rounded transition hover:bg-blue-500'
        >
          Contribute to bday fund via Venmo
        </Button>
      )}
      <div className='mt-6'>
        {donations.map((donation: Donation, index: number) => (
          <div key={index} className='flex items-center gap-4'>
            <span>${donation.amount}</span>
            <span>from {donation.from}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
