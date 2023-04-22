import { INPUTS, Product } from '../../modules/constants.js';
import { set_fs } from 'xlsx';
// For Node ESM, fs must be loaded manually
import AbstractMethodPattern from './AbstractMethodPattern.js';
import * as fs from 'fs';
set_fs(fs);

export default class AONMethod extends AbstractMethodPattern {
    private main_sheetJSON: Array<Product>;

    constructor() {
        super();
        this.main_sheetJSON = [];
    }

    getJsonFromSheet() {
        try {
            INPUTS.DPI_SHEETS.forEach((sheet_name) => {
                let sheetJSON = this.getJson(this.workbook.Sheets[sheet_name], INPUTS.START_COL, INPUTS.END_COL);
                // Берем ДПИ цены и умножаем на 6% для каталога АОН
                sheetJSON = this.getAONPrices(sheetJSON);
                // TODO сделать валидацию таблице удалить пропуски и нули в ценах
                this.main_sheetJSON = [...this.main_sheetJSON, ...sheetJSON];
            });
        } catch (error) {
            console.error("#Error: #210420231825")
        }
        
        return this.main_sheetJSON;
    }

    getAONPrices(sheetJSON:Array<Product>): Array<Product> {
        sheetJSON.forEach((product:Product) => { 
            product.price = Math.round(product.price * 1.06);
            product.salePrice = Math.round(product.salePrice * 1.06);
        });
        return sheetJSON;
    }
}