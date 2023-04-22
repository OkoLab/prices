import { OZON, Product } from "../../modules/constants.js"
import { readFile, writeFile, set_fs, utils, WorkBook, WorkSheet } from 'xlsx';
import { getCellIndex, getCellAddress } from "../../modules/modules.js";
// For Node ESM, fs must be loaded manually
import * as fs from 'fs';
set_fs(fs);

export class OzonFileGenerator {
    private workbook: WorkBook;
    private sheet: WorkSheet;

    constructor(file_name: string)
    {
            this.workbook = readFile(file_name);
            this.sheet = this.workbook.Sheets[OZON.SHEET];
        // catch (error) {
        //     console.error('Error: #21042023925', error);
        // }
    }

    start(new_prices: Array<Product>, out_file_name: string)
    {
        try {
            const name = OZON.OUT_PATH  + out_file_name;
            // Удаляем продукты с нулевыми ценами и записываим их артикулы в отдельный файл
            new_prices = this.validate(new_prices, name);
            this.createWorkBook(new_prices);
            const date = this.getDate();
            writeFile(this.workbook, `${name}-${date}.xlsx`);
        } catch (error) {
            console.error('Error: #21042023926', error);
        }
    }
    
    // Берет json файл с продуктами и удаляет продукты с ценами, которые равны 0, underfined, null
    // return отдельный файл с такими продуктами
    protected validate(sheet:Array<Product>, name: string){
        
        let sheetWithEmptyPrices:Array<Product> = [];
        let validatedSheet: Array<Product> = [];
        sheetWithEmptyPrices = sheet.filter((product) => !product.price || !product.price);
        validatedSheet = sheet.filter((product) => product.price && product.salePrice);   
        this.exportToExcel(sheetWithEmptyPrices, name);
        return validatedSheet;
    }

    private exportToExcel(date: Array<Product>, name: string) {
        try {
            /* generate worksheet */
            const ws: WorkSheet = utils.json_to_sheet(date);      
            /* generate workbook and add the worksheet */
            const wb: WorkBook = utils.book_new();
            utils.book_append_sheet(wb, ws, 'Sheet1');      
            /* save to file */
            writeFile(wb, `${name}-нулеваое значение.xlsx`);
        } catch (err) {
            console.error('Error: #21042023928', err);
        }
    }

    // начало генерации файла для озона. 
    private createWorkBook(new_prices: Array<Product>, address:string = OZON.ARTICLE_ADDRESS):WorkBook {
        let index = getCellIndex(address);
        //Берем артикул товара из файла для Озон (конечный)
        const sku = this.sheet[address];
        
        if(sku === undefined) {
            return this.workbook;
        }
        else {
            // Ищем этот артикул в файле исходнике (файл себестоимость). Возвращаем объект {артикул, цена, цена со скидкой}
           const product = new_prices.find(c => c.sku.toLowerCase() === sku.v.toLowerCase());
           // Если находим, то вставляем новые цены в файл для озона
           if(product) {
            if(product.price || product.salePrice){
                // надо выставить индекс на колонку J price
                this.sheet[this.getCellAddressForNewPrice(index.r)] = {t: 's', v: product.price };
                this.sheet[this.getCellAddressForNewSale(index.r)] = {t: 's', v: product.salePrice };
            }
           }

           index.r++;
           return this.createWorkBook(new_prices, getCellAddress(index));
        }
    }

    // выбрать ячейку куда записывать цену
    private getCellAddressForNewPrice(row: number) {
        const index = {
            r: row,
            c: getCellIndex(OZON.PRICE_ADDRESS).c
        };
        return getCellAddress(index);
    }

    // выбрать ячейку куда записывать цену со скидкой
    private getCellAddressForNewSale(row: number) {
        const index = {
            r: row,
            c: getCellIndex(OZON.SALE_PRICE_ADDRESS).c
        };
        return getCellAddress(index);
    }

    private getDate(){
        const date = new Date();
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes();
    }
}