import { CellAddress, utils } from 'xlsx';

export { getCellIndex, getCellAddress, getRangeCellAddress };

// Example: 'B12' - address, { c: 1, r: 11 } - index

// Example: input 'B12', return { c: 1, r: 11 }
function getCellIndex(cellAddress: string) {
    return utils.decode_cell(cellAddress);
}

// Example: input { c: 1, r: 11 }  return 'B12'
function getCellAddress(cellIndex: CellAddress) {
    return utils.encode_cell(cellIndex);
}

function getRangeCellAddress(cellIndex: CellAddress) {
    return utils.encode_cell(cellIndex);
}

function getRangeCellIndex(cellAddress :string) {
    return utils.decode_cell(cellAddress);
}





