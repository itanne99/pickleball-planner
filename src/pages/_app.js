import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import { Lexend } from "next/font/google";
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/ToastProvider';

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
    }
  }, []);

  return (
    <div className={lexend.className}>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </ToastProvider>
    </div>
  );
}
