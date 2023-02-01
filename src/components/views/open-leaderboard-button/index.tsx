/** @format */

import { FunctionComponent, ReactNode, useEffect } from 'react';
import styled from '@emotion/styled';
import { ComponentProps } from '@app/types/component-props';
import { IconButton } from '@chakra-ui/react';
import { useCogPlugin } from '@app/contexts/cog-plugin-provider';
import { Anchor } from '@app/types/anchor';
import { styles } from './open-leaderboard-button.styles';

export interface OpenLeaderboardButtonProps extends ComponentProps {
    children?: ReactNode;
}

const StyledOpenLeaderboardButton = styled('div')`
    ${styles}
`;

export const OpenLeaderboardButton: FunctionComponent<OpenLeaderboardButtonProps> = (
    props: OpenLeaderboardButtonProps
) => {
    const { children, ...otherProps } = props;
    const { registerPlugin, openModal } = useCogPlugin();

    const handleOpenLeaderboard = () => {
        openModal(`${window.location.pathname}leaderboard`);
    };

    useEffect(() => {
        registerPlugin(40, 40, Anchor.TopLeft);
    });

    return (
        <StyledOpenLeaderboardButton {...otherProps}>
            <IconButton
                colorScheme="green"
                aria-label="Open leaderboard"
                icon={<i className="bi bi-trophy-fill" />}
                onClick={handleOpenLeaderboard}
            />
        </StyledOpenLeaderboardButton>
    );
};
