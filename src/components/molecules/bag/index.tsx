/** @format */

import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { ComponentProps } from '@app/types/component-props';
import { BagSlot } from '@app/components/atoms/bag-slot';
import { BagModel } from '@app/types/inventory';

export interface BagProps extends ComponentProps {
    equipIndex: number;
    bag: BagModel;
    maxBagSlots: number;
}

const StyledBag = styled('div')`
    display: grid;
    grid-auto-flow: column;
`;

export const Bag: FunctionComponent<BagProps> = (props: BagProps) => {
    const { equipIndex, bag, id, maxBagSlots, ...otherProps } = props;

    const numBagSlots = Math.min(maxBagSlots, bag.slots.length);

    return (
        <StyledBag {...otherProps}>
            {bag.slots.slice(0, numBagSlots).map((slot, index) => (
                <BagSlot key={index} slot={slot} equipIndex={equipIndex} slotIndex={index} id={id} />
            ))}
            {numBagSlots < maxBagSlots && (
                <BagSlot slot={null} equipIndex={equipIndex} slotIndex={numBagSlots} id={id} />
            )}
        </StyledBag>
    );
};
