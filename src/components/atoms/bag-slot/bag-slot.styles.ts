/** @format */

import { css } from '@emotion/css';
import { BagSlotProps } from './index';

/**
 * Base styles for the bag slot component
 *
 * @param _ The bag slot properties object
 * @return Base styles for the bag slot component
 */
const baseStyles = (_: Partial<BagSlotProps>) => css``;

/**
 * The bag slot component styles
 *
 * @param props The bag slot properties object
 * @return Styles for the bag slot component
 */
export const styles = (props: Partial<BagSlotProps>) => css`
    ${baseStyles(props)}
`;
