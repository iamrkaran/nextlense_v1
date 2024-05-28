'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  Activity,
  Bookmark,
  ChevronLeft,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
} from 'lucide-react';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function MoreDropdown() {
  const [showModeToggle, setShowModeToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    // Close the dropdown when the user clicks outside
    function handleOutsideClick(event: MouseEvent) {
      if (!event.target) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowModeToggle(false);
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref]);

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpen(!open)}
          variant={'ghost'}
          size={'lg'}
          className="!justify-start space-x-2 !px-3 md:w-full"
        >
          <Menu />
          <div className="hidden lg:block">More</div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn(
          'w-64 !rounded-xl !p-0 transition-opacity dark:bg-neutral-800',
          !open && 'opacity-0',
        )}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle && (
          <>
            <DropdownMenuItem
              className="menuItem"
              onClick={() => alert('Please Go To Profile Page')}
            >
              <Settings size={20} />
              <p>Settings</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="menuItem"
              onClick={() => alert('Coming Soon')}
            >
              <Activity size={20} />
              <p>Your activity</p>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="menuItem"
              onClick={() => setShowModeToggle(true)}
            >
              <Moon size={20} />
              <p>Switch appearance</p>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="menuItem"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut size={20} />
              <p>Log out</p>
            </DropdownMenuItem>
          </>
        )}

        {showModeToggle && (
          <>
            <div className="flex items-center border-b border-gray-200 px-2.5 py-3.5 dark:border-neutral-700">
              <ChevronLeft size={18} onClick={() => setShowModeToggle(false)} />
              <p className="ml-1 font-bold">Switch appearance</p>
              {theme === 'dark' ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </div>

            <Label htmlFor="dark-mode" className="menuItem">
              Dark Mode
              <DropdownMenuItem className="ml-auto !p-0">
                <Switch
                  id="dark-mode"
                  className="ml-auto"
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => {
                    setTheme(checked ? 'dark' : 'light');
                  }}
                />
              </DropdownMenuItem>
            </Label>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreDropdown;
