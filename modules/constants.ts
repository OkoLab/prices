export { INPUTS, OZON, Product };

/************** РАЗДЕЛ НАСТРОЙКИ ФАЙЛА ИСХОДНИКА ДПИ *****************/
const INPUTS = {
// Файл исходник
    FILE_NAME: './docs/in/_каталог - себестоимость и цены.xlsx',
// таблица файла исходника, которая относится к ДПИ
    DPI_SHEETS: ['ozon-dpi SK', 'ozon-dpi iB', 'ozon-dpi iK'],
    SHEET_HEADERS: [ "sku", "price", "salePrice" ],
// Ячейка с которой начинаются цены файла исходника
    START_COL: "B12",
// Колонна которой заканчиваются цены файла исходника
    END_COL: "D12",
// Флаг конца цен в столбце B файйла исходника
    END_FLAG: "END",
}

type Product = {
    sku: string;
    price: number;
    salePrice: number;
};

/************** РАЗДЕЛ НАСТРОЙКИ ФАЙЛА ЗАГРУЗКИ НА ОЗОН *****************/
// Файл загрузки на озон
const OZON = {
    DPI_TEMPLATE_NAME: './docs/in/ДПИ Шаблон цен.xlsx',
    АОN_TEMPLATE_NAME: './docs/in/АОН Шаблон цен.xlsx',
    OUT_PATH: './docs/out/',
    SHEET: 'Товары и цены',
    ARTICLE_ADDRESS: "A5",
    PRICE_ADDRESS: "I5",
    SALE_PRICE_ADDRESS: "J5"
}






