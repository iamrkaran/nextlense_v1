import { Heart, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import Searchbar from './Searchbar';

function Header() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-zinc-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950 sm:-ml-6 md:hidden">
      <Link href={'/dashboard'}>
        <p className={`text-xl font-semibold `}>NextLense</p>
      </Link>

      <div className="flex items-center space-x-2">
        <Searchbar />
        <Button size={'icon'} variant={'ghost'}>
          <Heart />
        </Button>
      </div>
    </header>
  );
}

export default Header;
