/** @format */

import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { ComponentProps } from '@app/types/component-props';
import { BagItem } from '@app/components/atoms/bag-item';
import { useDroppable } from '@dnd-kit/core';
import { SlotModel } from '@app/types/inventory';
import { resourceRegex, resources } from '@app/fixtures/resources';
import { getItemName } from '@app/helpers/inventory';

export interface BagSlotProps extends ComponentProps {
    equipIndex: number;
    slotIndex: number;
    slot: SlotModel | null;
}

const StyledBagSlot = styled('div')`
    position: relative;
    width: 60px;
    height: 60px;
    background: #1f2531;
    border: 3px solid #3e4c64;
    border-left: 0;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:first-child {
        border-left: 3px solid #3e4c64;
    }
`;

export const BagSlot: FunctionComponent<BagSlotProps> = (props: BagSlotProps) => {
    const { id, slot, equipIndex, slotIndex, ...otherProps } = props;
    const { setNodeRef } = useDroppable({
        id: `${id}-${equipIndex}-${slotIndex}`,
        data: {
            id,
            equipIndex,
            slotIndex
        }
    });

    function isResource(id: string) {
        return id.match(resourceRegex);
    }

    function getSlotName(slot: SlotModel) {
        return isResource(slot.resource.id) ? resources[slot.resource.id] : getItemName(slot.resource.id);
    }

    return (
        <StyledBagSlot ref={setNodeRef} {...otherProps}>
            {slot && slot.balance > 0 && (
                <BagItem
                    equipIndex={equipIndex}
                    slotIndex={slotIndex}
                    name={getSlotName(slot)}
                    balance={slot.balance}
                    id={id}
                />
            )}
        </StyledBagSlot>
    );
};
