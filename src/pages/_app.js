import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import { Lexend } from "next/font/google";
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import { ToastProvider } from '@/components/ToastProvider';

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export default function App({ Component, pageProps }) {
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
