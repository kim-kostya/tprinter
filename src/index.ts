import { data } from "./data";
import { web } from "./web"
import { telegram } from "./telegram"
import printer from 'printer'

export default {
    'CURRENT_PRINTER': printer.getDefaultPrinterName()
}

data.init()
// web.launch()
telegram.launch()
