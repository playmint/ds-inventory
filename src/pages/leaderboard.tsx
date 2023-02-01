/** @format */

import { Fragment } from 'react';
import Head from 'next/head';
import { CogPluginProvider } from '@app/contexts/cog-plugin-provider';
import { Leaderboard } from '@app/components/views/leaderboard';

export default function LeaderboardPage() {
    return (
        <Fragment>
            <Head>
                <title>Leaderboard plugin</title>
                <meta property="og:title" content="Leaderboard plugin" key="title" />
            </Head>
            <CogPluginProvider gameID="latest">
                <Leaderboard />
            </CogPluginProvider>
        </Fragment>
    );
}
