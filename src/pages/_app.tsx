/** @format */

import { Fragment } from 'react';
import { Global } from '@emotion/react';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { globalStyles } from '@app/styles/global.styles';
import { resetStyles } from '@app/styles/reset.styles';
import { theme } from '@app/styles/theme';

function App({ Component, pageProps }: any) {
    return (
        <Fragment>
            <Head>
                <title>Inventory plugin</title>
                <meta name="description" content="Inventory plugin" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Global styles={resetStyles} />
            <Global styles={globalStyles} />
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </Fragment>
    );
}

export default App;
