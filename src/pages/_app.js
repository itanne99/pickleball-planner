import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import { Lexend } from "next/font/google";
import Layout from '@/components/Layout';

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export default function App({ Component, pageProps }) {
  return (
    <div className={lexend.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
