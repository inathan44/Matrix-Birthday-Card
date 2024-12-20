import QRCode from 'react-qr-code';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
export default function DonationPopUp() {
  //   const [qrCodeData, setQrCodeData] = useState('https://example.com');

  return (
    <>
      <p className='mb-2'>@Ian-M-Nathan on venmo</p>
      <div className='flex items-center gap-4'>
        <div
          className='bg-white p-2 rounded-md'
          style={{
            height: 'auto',
            margin: '0 auto',
            maxWidth: 256,
            width: '100%',
          }}
        >
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={'https://account.venmo.com/u/ian-m-nathan'}
            viewBox={`0 0 256 256`}
          />
        </div>
        <a
          href='https://account.venmo.com/u/ian-m-nathan' // replace with your actual Venmo link
          className='bg-blue-600 text-white py-2 px-4 rounded transition hover:bg-blue-500'
          target='_blank'
          rel='noopener noreferrer'
        >
          <span className='flex items-center gap-3'>
            Contribute to bday fund via venmo <ExternalLinkIcon />
          </span>
        </a>
      </div>
    </>
  );
}
