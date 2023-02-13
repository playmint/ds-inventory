/** @format */

import { css } from '@emotion/css';
import { InventoryProps } from './index';

/**
 * Base styles for the inventory component
 *
 * @param _ The inventory properties object
 * @return Base styles for the inventory component
 */
const baseStyles = (_: Partial<InventoryProps>) => css``;

/**
 * The inventory component styles
 *
 * @param props The inventory properties object
 * @return Styles for the inventory component
 */
export const styles = (props: Partial<InventoryProps>) => css`
    ${baseStyles(props)}
`;
