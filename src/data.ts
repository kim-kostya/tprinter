import {createConnection, Connection, EntityTarget, Repository} from "typeorm";
import typeorm from "typeorm"

var connection: Connection;

export default {
    async init() {
        connection = await createConnection({
            type: "sqlite",
            database: "./database.sqlite"
        });

        await connection.connect()
    },

    getRepository<Entity>(entityType: EntityTarget<Entity>): Repository<Entity> {
        return typeorm.getRepository(entityType)
    }
}