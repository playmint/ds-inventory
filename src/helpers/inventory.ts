/** @format */
import { BigNumber, ethers } from 'ethers';
import { TileCoords } from '@app/types/title-coords';
import { State, Tile } from '@app/types/inventory';

export const getSeeker = (state: State, account: string) => {
    if (state && account) {
        return state.seekers.find((seeker) => {
            if (!seeker.owner || seeker.owner.addr == '0x0') {
                return false;
            }
            return ethers.utils.getAddress(seeker.owner.addr) == account;
        });
    }

    return null;
};

export const getTile = (state: State, tilePos: TileCoords) => {
    if (!tilePos) return null;

    return state.tiles.find((tile) => {
        return isSamePos(getTileCoords(tile), tilePos);
    });
};

export const getTileCoords = (tile: Tile): TileCoords => {
    const coords = tile.coords.slice(1).map((hex) => BigNumber.from(hex).fromTwos(16).toNumber());
    return (coords.length == 3 ? coords : [0, 0, 0]) as TileCoords;
};

export const isSamePos = (a: TileCoords, b: TileCoords) => {
    if (a == null || b == null) return false;

    for (let i = 0; i < 3; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
};

export const getItemName = (itemID: string): string => {
    const last15Bytes = itemID.slice(-30, -16);
    const asciiString = ethers.utils.toUtf8String('0x' + last15Bytes);

    return asciiString;
};
