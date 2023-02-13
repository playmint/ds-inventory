/** @format */

import { Fragment } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Inventory } from '@app/components/views/inventory';
import { GameStateProvider } from '@app/contexts/game-state-provider';
import { CogPluginProvider } from '@app/contexts/cog-plugin-provider';
import { ethers } from 'ethers';

/** @format */

const InventoryPage = () => {
    const client = new ApolloClient({
        uri: 'http://localhost:8080/query',
        cache: new InMemoryCache()
    });

    const actions = new ethers.utils.Interface([
        `
        function TRANSFER_ITEM_SEEKER(
            bytes24 seeker,
            bytes24[2] calldata equipees,
            uint8[2] calldata equipSlots,
            uint8[2] calldata itemSlots,
            uint64 qty
        ) external;
        `
    ]);

    return (
        <Fragment>
            <Head>
                <title>Inventory plugin</title>
                <meta property="og:title" content="Inventory plugin" key="title" />
            </Head>
            <CogPluginProvider gameID="DAWNSEEKERS" actions={actions}>
                <ApolloProvider client={client}>
                    <GameStateProvider>
                        <Inventory />
                    </GameStateProvider>
                </ApolloProvider>
            </CogPluginProvider>
        </Fragment>
    );
};

export default InventoryPage;
