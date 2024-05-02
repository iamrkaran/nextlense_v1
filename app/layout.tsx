import '@/app/ui/global.css';
import { Metadata } from 'next';
import AppProvider from '../components/providers/Provider';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Nextlense',
    default: 'Nextlense',
  },
  description: 'Nextlense is a Social Media platform ',
  metadataBase: new URL('https://nextlense-v1.vercel.app'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
