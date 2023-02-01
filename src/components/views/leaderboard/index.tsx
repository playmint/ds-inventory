/** @format */

import { FunctionComponent, ReactNode, useEffect } from 'react';
import styled from '@emotion/styled';
import { ComponentProps } from '@app/types/component-props';
import { OrderedList, ListItem, Center } from '@chakra-ui/react';
import { useCogPlugin } from '@app/contexts/cog-plugin-provider';

export interface LeaderboardProps extends ComponentProps {
    children?: ReactNode;
}

const StyledLeaderboard = styled.div`
    ol {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
        color: white;
    }
`;

export const Leaderboard: FunctionComponent<LeaderboardProps> = (props: LeaderboardProps) => {
    const { children, ...otherProps } = props;
    const { closeModal } = useCogPlugin();

    function handleEscape(event: KeyboardEvent) {
        const escapeKeyCode = 27;
        if (event.key === 'Escape' || event.keyCode === escapeKeyCode) {
            closeModal();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <StyledLeaderboard {...otherProps}>
            <Center>
                <OrderedList>
                    <ListItem>Lorem ipsum dolor sit amet</ListItem>
                    <ListItem>Consectetur adipiscing elit</ListItem>
                    <ListItem>Integer molestie lorem at massa</ListItem>
                    <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </OrderedList>
            </Center>
        </StyledLeaderboard>
    );
};
