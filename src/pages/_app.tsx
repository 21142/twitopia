import { type AppType } from 'next/app';
import { api } from '~/lib/api';
import '~/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <Head>
        <title>Twitopia</title>
        <meta
          name="description"
          content="Twitopia"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
