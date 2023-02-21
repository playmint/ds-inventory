/** @format */

import { FunctionComponent, useEffect, Fragment, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { ComponentProps } from '@app/types/component-props';
import { useCogPlugin } from '@app/contexts/cog-plugin-provider';
import { useRouter } from 'next/router';
import { useGameStateContext } from '@app/contexts/game-state-provider';
import { getSeeker, getTile } from '@app/helpers/inventory';
import { TileCoords } from '@app/types/title-coords';
import { Bag } from '@app/components/molecules/bag';
import { BagModel } from '@app/types/inventory';
import { Active, DndContext, DragEndEvent, Over } from '@dnd-kit/core';
import { StackSplitter } from '@app/components/molecules/stack-splitter';
import { useDisclosure } from '@chakra-ui/react';

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
    const [isControlPressed, setIsControlPressed] = useState<boolean>(false);
    const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onConfirm = useRef<(quantity: number) => void>();
    const numItems = useRef<number>(0);

    // get our seeker
    const account = query.account?.toString() || '';
    const seeker = state ? getSeeker(state, account) : null;

    // get the selected tile's bag
    const { q, r, s } = query;
    const tilePos =
        q && r && s
            ? ([parseInt(q.toString()), parseInt(r.toString()), parseInt(s.toString())] as TileCoords)
            : undefined;
    const selectedTile = state && tilePos ? getTile(state, tilePos) : null;

    // key codes
    const shiftKeyCode = 16;
    const controlKeyCode = 17;
    const escapeKeyCode = 27;

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape' || event.keyCode === escapeKeyCode) {
            closeModal();
        }
        if (event.key === 'Control' || event.keyCode === controlKeyCode) {
            setIsControlPressed(true);
        }
        if (event.key === 'Shift' || event.keyCode === shiftKeyCode) {
            setIsShiftPressed(true);
        }
    }

    function handleKeyup(event: KeyboardEvent) {
        if (event.key === 'Control' || event.keyCode === controlKeyCode) {
            setIsControlPressed(false);
        }
        if (event.key === 'Shift' || event.keyCode === shiftKeyCode) {
            setIsShiftPressed(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyup);
        };
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over?.data?.current || !active?.data?.current) {
            return;
        }

        if (isShiftPressed) {
            onConfirm.current = (quantity: number) => {
                transferItem(active, over, quantity);
            };
            numItems.current = active?.data.current['balance'];
            onOpen();
            return;
        }

        if (isControlPressed) {
            transferItem(active, over, Math.min(active?.data.current['balance'], 100));
            return;
        }

        transferItem(active, over, active?.data.current['balance']);
    };

    const transferItem = (active: Active, over: Over, quantity?: number) => {
        if (!seeker || !selectedTile || !over?.data?.current || !active?.data?.current) {
            return;
        }

        const fromId = active?.data.current['id'];
        const toId = over.data.current['id'];
        const fromEquipIndex = active.data.current['equipIndex'];
        const toEquipIndex = over.data.current['equipIndex'];
        const fromSlotIndex = active.data.current['slotIndex'];
        const toSlotIndex = over.data.current['slotIndex'];

        dispatchAction(
            'TRANSFER_ITEM_SEEKER',
            seeker.id,
            [fromId, toId],
            [fromEquipIndex, toEquipIndex],
            [fromSlotIndex, toSlotIndex],
            quantity
        );
    };

    const maxBagSlots = 4;

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <StyledInventory {...otherProps}>
                {seeker?.bags && (
                    <Fragment>
                        <h2>Seeker bags</h2>
                        {seeker.bags.map((bag: BagModel, index) => (
                            <Bag
                                key={index}
                                bag={bag}
                                equipIndex={index}
                                id={seeker.id}
                                className="bag"
                                maxBagSlots={maxBagSlots}
                            />
                        ))}
                    </Fragment>
                )}
                {selectedTile?.bags && (
                    <Fragment>
                        <h2>Tile bags</h2>
                        {selectedTile.bags.map((bag: BagModel, index) => (
                            <Bag
                                key={index}
                                bag={bag}
                                equipIndex={index}
                                id={selectedTile.id}
                                className="bag"
                                maxBagSlots={maxBagSlots}
                            />
                        ))}
                    </Fragment>
                )}
                <StackSplitter
                    numItems={numItems.current}
                    onClose={onClose}
                    isOpen={isOpen}
                    onConfirm={onConfirm.current}
                />
            </StyledInventory>
        </DndContext>
    );
};
