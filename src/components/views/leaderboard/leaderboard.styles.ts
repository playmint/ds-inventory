/** @format */

import { css } from '@emotion/css';
import { LeaderboardProps } from './index';

/**
 * Base styles for the leaderboard component
 *
 * @param _ The leaderboard properties object
 * @return Base styles for the leaderboard component
 */
const baseStyles = (_: Partial<LeaderboardProps>) => css``;

/**
 * The leaderboard component styles
 *
 * @param props The leaderboard properties object
 * @return Styles for the leaderboard component
 */
export const styles = (props: Partial<LeaderboardProps>) => css`
    ${baseStyles(props)}
`;
