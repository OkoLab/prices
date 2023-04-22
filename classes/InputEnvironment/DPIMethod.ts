import { INPUTS, Product } from '../../modules/constants.js';
import { set_fs } from 'xlsx';
// For Node ESM, fs must be loaded manually
import AbstractMethodPattern from './AbstractMethodPattern.js';
import * as fs from 'fs';
set_fs(fs);

export default class DPIMethod extends AbstractMethodPattern {
    main_sheetJSON: Array<Product>;

    constructor() {
        super();
        this.main_sheetJSON = [];
    }

    getJsonFromSheet() {
        INPUTS.DPI_SHEETS.forEach((sheet_name) => {
            const sheetJSON = this.getJson(this.workbook.Sheets[sheet_name], INPUTS.START_COL, INPUTS.END_COL);

            // TODO сделать валидацию таблице удалить пропуски и нули в ценах
            this.main_sheetJSON = [...this.main_sheetJSON, ...sheetJSON];
        });
              
        return this.main_sheetJSON;
    }
}