import fs from "node:fs/promises";

const dbPath = new URL("./db.json", import.meta.url).pathname;

export const getDB = async () => {
    const db = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(db);
};

export const saveDB = async (db) => {
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    return db;
};

export const insertDB = async (note) => {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
};
