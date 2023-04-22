import { INPUTS, Product } from '../../modules/constants.js';
import { getCellIndex, getCellAddress } from '../../modules/modules.js';
import { CellAddress, WorkBook, WorkSheet, readFile, set_fs, utils } from 'xlsx';
// For Node ESM, fs must be loaded manually
import * as fs from 'fs';
set_fs(fs);

export default abstract class AbstractMethodPattern {
    protected workbook: WorkBook;

    abstract getJsonFromSheet(): Array<Product>;

    constructor() {
        this.workbook = readFile(INPUTS.FILE_NAME);      
    }

    protected getJson(sheet: WorkSheet, startCol: string, endCol: string):Array<Product> {

        const cellsRangeAddress =  this.getCellsRangeAddress(sheet, startCol, endCol)    
        return utils.sheet_to_json(sheet, { header: INPUTS.SHEET_HEADERS, range: cellsRangeAddress });
    }

    // Получаем адрес первой ячейки и адрес последней ячейки
    private getCellsRangeAddress(sheet: WorkSheet, startCellAddress: string, endCol: string) {

        const endRowIndex = this.getLastRowIndex(sheet, startCellAddress);
        const endColIndex =  getCellIndex(endCol);
    
        const endCellIndex = {
            c: endColIndex.c,
            r: endRowIndex.r
        };

        const endCellAddress = getCellAddress(endCellIndex);
        return  `${startCellAddress}:${endCellAddress}`;
    }

    private getLastRowIndex(sheet: WorkSheet, start_col: string):CellAddress {

        let index = getCellIndex(start_col);
        const value = sheet[getCellAddress(index)]

        if(value === undefined || value.v === INPUTS.END_FLAG) {
            index.r--;
            return index;
        }

        index.r++;
        return this.getLastRowIndex(sheet, getCellAddress(index));
    }

}