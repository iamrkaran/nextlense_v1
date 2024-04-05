import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ThemeProvider } from './theme-provider';
import { Toaster } from "sonner";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default Provider;
