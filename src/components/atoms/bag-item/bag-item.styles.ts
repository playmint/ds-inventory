/** @format */

import { css } from '@emotion/css';
import { BagItemProps } from './index';

/**
 * Base styles for the bag item component
 *
 * @param _ The bag item properties object
 * @return Base styles for the bag item component
 */
const baseStyles = (_: Partial<BagItemProps>) => css``;

/**
 * The bag item component styles
 *
 * @param props The bag item properties object
 * @return Styles for the bag item component
 */
export const styles = (props: Partial<BagItemProps>) => css`
    ${baseStyles(props)}
`;
