import Navbar from './Navbar';

interface Donation {
  amount: number;
  from: string;
}

const donations: Donation[] = [
  { amount: 10, from: 'Ian' },
  { amount: 10, from: 'Oscar' },
  { amount: 10, from: 'Gabe' },
  { amount: 10, from: 'Ev Mays' },
  { amount: 10, from: 'Ky G' },
  { amount: 10, from: 'Julie' },
  { amount: 10, from: 'Maria' },
  { amount: 10, from: 'Dakota' },
  { amount: 10, from: 'Adam' },
  { amount: 10, from: 'Cio' },
  { amount: 10, from: 'Jacob' },
  { amount: 10, from: 'Katsiaryna' },
];

export default function Donate() {
  document.title = "Donate to David's Birthday Gift Fund";

  // const [showDonation, setShowDonation] = useState(false);
  // const handleDonationClick = () => {
  //   setShowDonation(!showDonation);
  // };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white p-4'>
      <Navbar />
      <h1 className='text-3xl font-bold mb-4'>
        Donate to David's Birthday Fund
      </h1>
      <img className='px-6' src='Screenshot 2024-11-27 at 10.23.10 AM.png' />
      <h1 className='text-lg text-green-500'>
        Funds were already sent, no longer accepting donations. Thanks so
        everyone who contributed / wrote a message!
      </h1>

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
