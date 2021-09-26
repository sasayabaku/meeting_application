import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../state/store';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#e1e8ed" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
