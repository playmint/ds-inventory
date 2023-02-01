/** @format */

import { css } from '@emotion/css';
import { OpenLeaderboardButtonProps } from './index';

/**
 * Base styles for the open leaderboard button component
 *
 * @param _ The open leaderboard button properties object
 * @return Base styles for the open leaderboard button component
 */
const baseStyles = (_: Partial<OpenLeaderboardButtonProps>) => css``;

/**
 * The open leaderboard button component styles
 *
 * @param props The open leaderboard button properties object
 * @return Styles for the open leaderboard button component
 */
export const styles = (props: Partial<OpenLeaderboardButtonProps>) => css`
    ${baseStyles(props)}
`;
