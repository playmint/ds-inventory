/** @format */

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Anchor } from '@app/types/anchor';
import { Interface } from 'ethers/lib/utils';

export interface CogPluginContextProviderProps {
    children?: ReactNode;
    gameID: string;
    actions?: Interface;
}

export interface CogPluginContextStore {
    isReady: boolean;
    account: string;
    registerPlugin: (width: number, height: number, anchor: Anchor) => void;
    dispatchAction: (actionName: string, ...actionArgs: any) => void;
    dispatchActionEncoded: (actionHex: string) => void;
    openModal: (url: string) => void;
    closeModal: () => void;
}

export const CogPluginContext = createContext<CogPluginContextStore>({} as CogPluginContextStore);

export const useCogPlugin = () => useContext(CogPluginContext);

export const CogPluginProvider = ({ children, gameID, actions }: CogPluginContextProviderProps) => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [account, setAccount] = useState('');

    const registerPlugin = (width: number, height: number, anchor: Anchor) => {
        // todo handle being the top level window
        if (!window.top) return;

        // todo use the full url not just the path
        const url = window.location.pathname;
        console.log('Register plugin', url);

        window.top.postMessage(
            {
                method: 'registerPlugin',
                args: {
                    url,
                    width,
                    height,
                    anchor,
                    x: 0,
                    y: 0
                }
            },
            '*'
        );
    };

    const dispatchAction = (actionName: string, ...actionArgs: any) => {
        // todo handle being the top level window
        if (!window.top) return;
        if (!actions) return;

        // console.log(`CogPluginProvider.dispatch: gameID: ${gameID} actionName: ${actionName}`);

        const action = actions.encodeFunctionData(actionName, actionArgs);

        dispatchActionEncoded(action);
    };

    const dispatchActionEncoded = (action: string) => {
        // todo handle being the top level window
        if (!window.top) return;

        // console.log(`CogPluginProvider.dispatchActionEncoded: action: ${action}`);

        // todo use the full url not just the path
        const url = window.location.pathname;

        window.top.postMessage(
            {
                method: 'dispatchAction',
                args: {
                    url,
                    gameID,
                    action
                }
            },
            '*'
        );
    };

    const openModal = (url: string) => {
        if (!window.top) return;
        window.top.postMessage(
            {
                method: 'openModal',
                args: {
                    url
                }
            },
            '*'
        );
    };

    const closeModal = () => {
        if (!window.top) return;
        window.top.postMessage(
            {
                method: 'closeModal'
            },
            '*'
        );
    };

    useEffect(() => {
        const handleMessage = (message: any) => {
            const { method, args } = message.data;
            switch (method) {
                case 'ready': {
                    const [account] = args;
                    console.log('handle shell message: Inventory received ready. account: ', account);
                    setAccount(account);
                    setIsReady(true);
                    break;
                }
            }
        };

        window.addEventListener('message', handleMessage);

        return () => window.removeEventListener('message', handleMessage);
    });

    const store: CogPluginContextStore = {
        isReady,
        account,
        registerPlugin,
        dispatchAction,
        dispatchActionEncoded,
        openModal,
        closeModal
    };
    return <CogPluginContext.Provider value={store}>{children}</CogPluginContext.Provider>;
};
