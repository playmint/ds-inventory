/** @format */

import { FunctionComponent, useState } from 'react';
import styled from '@emotion/styled';
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react';
import { ComponentProps } from '@app/types/component-props';

export interface StackSplitterProps extends ComponentProps {
    numItems: number;
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: (quantity: number) => void;
    onCancel?: () => void;
}

const StyledStackSplitter = styled('div')`
    position: relative;
`;

export const StackSplitter: FunctionComponent<StackSplitterProps> = (props: StackSplitterProps) => {
    const { numItems, isOpen, onClose, onConfirm, onCancel, ...otherProps } = props;
    const [quantity, setQuantity] = useState<number>(numItems);

    const handleCancel = () => {
        onCancel && onCancel();
        onClose();
    };

    const handleConfirm = () => {
        onConfirm && onConfirm(quantity);
        onClose();
    };

    function handleOnChange(valueString: string) {
        try {
            const quantity = parseInt(valueString);
            setQuantity(quantity);
        } catch {
            setQuantity(0);
        }
    }

    return (
        <StyledStackSplitter {...otherProps}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Split stack</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <NumberInput min={0} max={numItems} onChange={handleOnChange} defaultValue={numItems}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </ModalBody>
                    <ModalFooter className="buttons">
                        <Button onClick={handleCancel} mr={1}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} colorScheme="blue">
                            OK
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </StyledStackSplitter>
    );
};
