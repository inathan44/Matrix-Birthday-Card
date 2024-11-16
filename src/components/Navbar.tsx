import { Link } from 'react-router-dom';
import { buttonVariants } from './ui/button';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className='flex gap-4'>
      <Link
        to={'/'}
        className={cn(buttonVariants({ variant: 'secondary' }), {
          'bg-gray-400 cursor-default hover:bg-gray-400': currentPath === '/',
        })}
      >
        Homepage
      </Link>
      <Link
        to={'/donate'}
        className={cn(buttonVariants({ variant: 'secondary' }), {
          'bg-gray-400 cursor-default hover:bg-gray-400':
            currentPath === '/donate',
        })}
      >
        Donate to David's Birthday Fund
      </Link>
      <Link
        to={'/addnote'}
        className={cn(buttonVariants({ variant: 'secondary' }), {
          'bg-gray-400 cursor-default hover:bg-gray-400':
            currentPath === '/addnote',
        })}
      >
        Write a message
      </Link>
    </div>
  );
}
