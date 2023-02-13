/** @format */

import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { ComponentProps } from '@app/types/component-props';
import { BagSlot } from '@app/components/atoms/bag-slot';
import { BagModel } from '@app/types/inventory';

export interface BagProps extends ComponentProps {
    equipIndex: number;
    bag: BagModel;
}

const StyledBag = styled('div')`
    display: grid;
    grid-auto-flow: column;
`;

export const Bag: FunctionComponent<BagProps> = (props: BagProps) => {
    const { equipIndex, bag, id, ...otherProps } = props;

    return (
        <StyledBag {...otherProps}>
            {bag.slots.map((slot, index) => (
                <BagSlot key={index} slot={slot} equipIndex={equipIndex} slotIndex={index} id={id} />
            ))}
            <BagSlot slot={null} equipIndex={equipIndex} slotIndex={bag.slots.length} id={id} />
        </StyledBag>
    );
};
