import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/contexts/ToastContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import MainNav from '@/components/MainNav';
import { AuthProvider } from '@/contexts/AuthContext';
import { ReduxProvider } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Unnata Forest View',
  description: 'Luxury hotel with breathtaking forest views',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ReduxProvider>
            <AuthProvider>
              <LoadingProvider>
                <ToastProvider>
                  <MainNav />
                  {children}
                </ToastProvider>
              </LoadingProvider>
            </AuthProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
