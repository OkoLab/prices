import { INPUTS, OZON } from './modules/constants.js';
import DPIMethod from './classes/InputEnvironment/DPIMethod.js';
import { OzonFileGenerator } from './classes/OutputEnvironment/OzonFileGenerator.js';
import AONMethod from './classes/InputEnvironment/AONMethod.js';
// For Node ESM, fs must be loaded manuallyq
import * as fs from 'fs';
import { set_fs } from 'xlsx';
set_fs(fs);

if (fs.existsSync(INPUTS.FILE_NAME)) {
    if(fs.existsSync(OZON.DPI_TEMPLATE_NAME)) {
        const dpi = new DPIMethod();
        const dpi_cellsJSON = dpi.getJsonFromSheet();
        const dpi_ozon_gen = new OzonFileGenerator(OZON.DPI_TEMPLATE_NAME);
        dpi_ozon_gen.start(dpi_cellsJSON, "дпи");
    }
    if(fs.existsSync(OZON.АОN_TEMPLATE_NAME)) {
        const aon = new AONMethod();
        const aon_cellsJSON = aon.getJsonFromSheet();
        const aon_ozon_gen = new OzonFileGenerator(OZON.АОN_TEMPLATE_NAME);
        aon_ozon_gen.start(aon_cellsJSON, "аон");
        console.log("Метод АОН обработан");        
    }
} else {
    console.log(`File ${INPUTS.FILE_NAME} not found!`);
}

