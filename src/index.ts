import data from "./data";
import { web } from "./web"
import telegram from "./telegram"

async function main() {
    await data.init()
    await web.launch()
    await telegram.launch()
}

main()