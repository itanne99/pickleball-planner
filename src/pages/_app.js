import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import { Lexend } from "next/font/google";
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/ToastProvider';
import { Agentation } from 'agentation';

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedTheme = localStorage.getItem('theme');
    document.body.classList.toggle('light-theme', storedTheme === 'light');

  }, []);

  return (
    <div className={lexend.className}>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </ToastProvider>
      <Agentation />
    </div>
  );
}
