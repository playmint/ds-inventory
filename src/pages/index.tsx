/** @format */

import { Fragment } from 'react';
import Head from 'next/head';
import { CogPluginProvider } from '@app/contexts/cog-plugin-provider';
import { OpenLeaderboardButton } from '@app/components/views/open-leaderboard-button';

export default function HomePage() {
    return (
        <Fragment>
            <Head>
                <title>Leaderboard plugin</title>
                <meta property="og:title" content="Leaderboard plugin" key="title" />
            </Head>
            <CogPluginProvider gameID="latest">
                <OpenLeaderboardButton />
            </CogPluginProvider>
        </Fragment>
    );
}
