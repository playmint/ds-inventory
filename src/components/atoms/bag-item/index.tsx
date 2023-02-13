/** @format */

import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { ComponentProps } from '@app/types/component-props';
import { rgba } from 'polished';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export interface BagItemProps extends ComponentProps {
    equipIndex: number;
    slotIndex: number;
    name: string;
    balance: number;
}

const StyledBagItem = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${rgba('#0d9a84', 0.6)};
    position: relative;

    > .name {
        display: block;
    }

    > .balance {
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 75%;
    }
`;

export const BagItem: FunctionComponent<BagItemProps> = (props: BagItemProps) => {
    const { equipIndex, slotIndex, id, name, balance, ...otherProps } = props;
    const { setNodeRef, attributes, listeners, transform } = useDraggable({
        id: `${id}-${equipIndex}-${slotIndex}`,
        data: {
            id,
            equipIndex,
            slotIndex,
            balance
        }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        zIndex: 1000
    };

    return (
        <StyledBagItem ref={setNodeRef} {...listeners} {...attributes} {...otherProps} style={style}>
            <span className="name">{name}</span>
            <span className="balance">{balance}</span>
        </StyledBagItem>
    );
};
