import { DuckDBConnection, DuckDBInstance, timestampSecondsValue } from "@duckdb/node-api";

let connection: DuckDBConnection;

export async function startDuckDB() {
    const rainbowDuckDBFileName = "rainbow_duckdb.db";

    const instance = await DuckDBInstance.create(rainbowDuckDBFileName);
    connection = await instance.connect();

    const tables = [
        {
            name: "Rainbows",
            creationCommand:
                "CREATE TABLE Rainbows (room_id VARCHAR, rainbow VARCHAR, sent TIMESTAMP_S);",
        }
    ]

    const existingTablesRows = await connection.run("SHOW TABLES;");
    const existingTables = await existingTablesRows.getRowObjects();

    tables.forEach(async (table) => {
        const tableExists = existingTables.filter((existingTable) => existingTable.name === table.name).length > 0;

        if (tableExists) {
            console.log(`${table.name} already exists`);
        } else {
            await connection.run(table.creationCommand);
            console.log(`${table.name} created`);
        }
    });
}

export async function getRainbowsAll() {
    const getRainbows = `SELECT * FROM Rainbows;`;
    const prepared = await connection.prepare(getRainbows);
    const rainbowsRows = await prepared.run();
    const rainbows = await rainbowsRows.getRowObjects();
    return rainbows;
}

export async function getRainbowsByRoomId(roomId: string) {
    const getRainbows = `SELECT * FROM Rainbows WHERE room_id = $1;`;
    const prepared = await connection.prepare(getRainbows);
    prepared.bindVarchar(1, roomId);
    const rainbowsRows = await prepared.run();
    const rainbows = await rainbowsRows.getRowObjects();
    return rainbows;
}

export async function insertRainbow(roomId: string, rainbow: string) {
    const insertRainbow = `INSERT INTO Rainbows values ($1, $2, $3);`;
    const prepared = await connection.prepare(insertRainbow);
    prepared.bindVarchar(1, roomId);
    prepared.bindVarchar(2, rainbow);
    const timestamp = timestampSecondsValue(BigInt(Math.floor(Date.now() / 1000)))
    prepared.bindTimestampSeconds(3, timestamp);
    await prepared.run();
    return;
}

startDuckDB();