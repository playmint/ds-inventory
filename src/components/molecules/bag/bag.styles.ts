/** @format */

import { css } from '@emotion/css';
import { BagProps } from './index';

/**
 * Base styles for the bag component
 *
 * @param _ The bag properties object
 * @return Base styles for the bag component
 */
const baseStyles = (_: Partial<BagProps>) => css``;

/**
 * The bag component styles
 *
 * @param props The bag properties object
 * @return Styles for the bag component
 */
export const styles = (props: Partial<BagProps>) => css`
    ${baseStyles(props)}
`;
