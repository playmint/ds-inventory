/** @format */

import { Fragment } from 'react';
import Head from 'next/head';
import { OpenInventoryButton } from '@app/components/views/open-inventory-button';
import { CogPluginProvider } from '@app/contexts/cog-plugin-provider';

export default function HomePage() {
    return (
        <Fragment>
            <Head>
                <title>Inventory plugin</title>
                <meta property="og:title" content="Inventory plugin" key="title" />
            </Head>
            <CogPluginProvider gameID="DAWNSEEKERS">
                <OpenInventoryButton />
            </CogPluginProvider>
        </Fragment>
    );
}
