/** @format */

import { useGetStateQuery } from '@app/types/queries';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type State = Required<NonNullable<ReturnType<typeof useGetStateQuery>['data']>['game']>['state'];

export interface GameStateContextProviderProps {
    children?: ReactNode;
}

export interface GameStateContextStore {
    state?: State;
}

export const GameStateContext = createContext<GameStateContextStore>({} as GameStateContextStore);

export const useGameStateContext = () => useContext(GameStateContext);

export const GameStateProvider = ({ children }: GameStateContextProviderProps) => {
    // const client = useApolloClient();

    // -- Initial state query
    const { data: stateData } = useGetStateQuery({
        pollInterval: 2000
    });
    const [state, setState] = useState(stateData?.game.state);

    useEffect(() => {
        if (stateData) {
            setState(stateData.game.state);
        }
    }, [stateData]);

    useEffect(() => {
        if (stateData) {
            setState(stateData.game.state);
        }
    }, [stateData]);

    const store: GameStateContextStore = {
        state
    };

    return <GameStateContext.Provider value={store}>{children}</GameStateContext.Provider>;
};
