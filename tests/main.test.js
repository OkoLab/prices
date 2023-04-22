import { describe, it, expect } from 'vitest';
import { OzonFileGenerator } from '../classes/OutputEnvironment/OzonFileGenerator';
import { INPUTS, OZON } from '../modules/constants';
import { getCellIndex } from '../modules/modules';
import DPIMethod from '../classes/InputEnvironment/DPIMethod';
import AONMethod from '../classes/InputEnvironment/AONMethod';
import { writeFile, set_fs } from 'xlsx';
import * as fs from 'fs';
set_fs(fs);

// describe('OzonFileGenerator', () => {
    
//     // const ozon_gen = new OzonFileGenerator(OZON.DPI_TEMPLATE_NAME);

//     // it('getCellIndexForNewPrice - возвращает индекс ячейки строки row. Сравниваем с индексом реальной ячейки по этому адресу', () =>{
//     //     const row = 8; 
//     //     expect(ozon_gen['getCellAddressForNewPrice'](row)).toEqual("I9");
//     // });
//     // it('getCellIndexForNewSale - возвращает индекс ячейки строки row. Сравниваем с индексом реальной ячейки по этому адресу', () =>{
//     //     const row = 8; 
//     //     expect(ozon_gen['getCellAddressForNewSale'](row)).toEqual("J9");
//     // });
//     // it('start', ()=> {
//     //     const product = [{ articul: '2300-1-0700-5', price: 14250, sale: 7125 }, { articul: '2300-1-700-10', price: 14250, sale: 7125 }, { articul: '6800-1-311-10', price: 142230, sale: 89125 }];
//     //     const workbook = ozon_gen.start(product, OZON.ARTICLE_ADDRESS);
//     //     writeFile(workbook, 'out_test.xlsx');
//     // })
// })

describe('InputEnvironment', () => {
    it('DPIMethod - get cells values from price list ', () =>{
        const dpi = new DPIMethod();
        const cellsJSON = dpi.getJsonFromSheet();
        const ozon_gen = new OzonFileGenerator(OZON.DPI_TEMPLATE_NAME);
        ozon_gen.start(cellsJSON, "дпи");
    });
    it('AONMethod - get cells values from price list ', () =>{
        const aon = new AONMethod();
        const cellsJSON = aon.getJsonFromSheet();
    });
})



// [
//     { articul: 'D1-1-K8-1', price: 19180, sale: 9590 },
//     { articul: 'D1-1-K9-1', price: 19180, sale: 9590 },
//     { articul: 'D1-1-K7-1', price: 18980, sale: 9490 },
//     { articul: 'D1-1-K6-1', price: 18780, sale: 9390 }
// ]