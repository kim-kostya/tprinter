import {createConnection, Connection, EntityTarget, Repository} from "typeorm";
import typeorm from "typeorm"
import { mkdirSync } from "fs";

var connection: Connection;

export default {
    TEMP_DIR: process.platform == 'win32' ? `${process.env.TMP}/tprinter` : '/tmp/tprinter',

    async init() {
        connection = await createConnection({
            type: "sqlite",
            database: "./database.sqlite"
        });

        mkdirSync(this.TEMP_DIR)

        await connection.connect()
    },

    getRepository<Entity>(entityType: EntityTarget<Entity>): Repository<Entity> {
        return typeorm.getRepository(entityType)
    }
}