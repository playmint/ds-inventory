/** @format */

import { FunctionComponent, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { ComponentProps } from '@app/types/component-props';
import { useCogPlugin } from '@app/contexts/cog-plugin-provider';
import { useRouter } from 'next/router';
import { useGameStateContext } from '@app/contexts/game-state-provider';
import { getSeeker, getTile } from '@app/helpers/inventory';
import { TileCoords } from '@app/types/title-coords';
import { Bag } from '@app/components/molecules/bag';
import { BagModel } from '@app/types/inventory';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

export interface InventoryProps extends ComponentProps {}

const StyledInventory = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;

    .bag {
        margin-bottom: 10px;
    }
`;

export const Inventory: FunctionComponent<InventoryProps> = (props: InventoryProps) => {
    const { ...otherProps } = props;
    const { closeModal, dispatchAction } = useCogPlugin();
    const { state } = useGameStateContext();
    const { query } = useRouter();

    // get our seeker
    const account = query.account?.toString() || '';
    const seeker = state ? getSeeker(state, account) : null;
    console.log('seeker bags: ', seeker?.bags);

    // get the selected tile's bag
    const { q, r, s } = query;
    const tilePos =
        q && r && s
            ? ([parseInt(q.toString()), parseInt(r.toString()), parseInt(s.toString())] as TileCoords)
            : undefined;
    const selectedTile = state && tilePos ? getTile(state, tilePos) : null;
    console.log('tile bags: ', selectedTile?.bags);

    function handleEscape(event: KeyboardEvent) {
        const escapeKeyCode = 27;
        if (event.key === 'Escape' || event.keyCode === escapeKeyCode) {
            closeModal();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        console.log(active, over);

        if (!seeker || !selectedTile || !over?.data?.current || !active?.data?.current) {
            return;
        }

        const fromId = active?.data.current['id'];
        const toId = over.data.current['id'];
        const fromEquipIndex = active.data.current['equipIndex'];
        const toEquipIndex = over.data.current['equipIndex'];
        const fromSlotIndex = active.data.current['slotIndex'];
        const toSlotIndex = over.data.current['slotIndex'];
        const quantity = active?.data.current['balance'];

        dispatchAction(
            'TRANSFER_ITEM_SEEKER',
            seeker.id,
            [fromId, toId],
            [fromEquipIndex, toEquipIndex],
            [fromSlotIndex, toSlotIndex],
            quantity
        );
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <StyledInventory {...otherProps}>
                {seeker?.bags && (
                    <Fragment>
                        <h2>Seeker bags</h2>
                        {seeker.bags.map((bag: BagModel, index) => (
                            <Bag key={index} bag={bag} equipIndex={index} id={seeker.id} className="bag" />
                        ))}
                    </Fragment>
                )}
                {selectedTile?.bags && (
                    <Fragment>
                        <h2>Tile bags</h2>
                        {selectedTile.bags.map((bag: BagModel, index) => (
                            <Bag key={index} bag={bag} equipIndex={index} id={selectedTile.id} className="bag" />
                        ))}
                    </Fragment>
                )}
            </StyledInventory>
        </DndContext>
    );
};
