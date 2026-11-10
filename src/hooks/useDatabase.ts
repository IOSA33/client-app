import { useSQLiteContext, deleteDatabaseAsync } from 'expo-sqlite';
import { Idata } from '../interfaces';
import { useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useDatabase = () => {
    const db = useSQLiteContext();

    const addDataHeight = async (height: number): Promise<void> => {
        if (height <= 0) throw new Error("Heigth cant be negative.");

        const result = await db.runAsync(`
            INSERT INTO userStats (id, height) VALUES (1, ?)
            ON CONFLICT(id) DO UPDATE SET height = excluded.height`, height);
        console.log("Inserted RowID: ", result.lastInsertRowId, ", Inserted changes: ", result.changes);
    }
    const addDataWeight = async (weight: number): Promise<void> => {
        if (weight <= 0) throw new Error("Weight cant be negative.");
        const result = await db.runAsync('UPDATE userStats SET weight = ?', weight);
        console.log("Inserted RowID: ", result.lastInsertRowId, ", Inserted changes: ", result.changes);
    }

    const getAllData = useCallback(async (): Promise<Idata[]> => {
        const allRows = await db.getAllAsync<Idata>('SELECT * FROM userStats');
        for (const row of allRows) {
            console.log(row);
        }
        return allRows;
    }, [db]);

    // Probably will be deleted in production
    const deleteDB = async (): Promise<void> => {
        await db.closeAsync();
        await deleteDatabaseAsync('test.db');
        console.log("Database successfulle deleted.")
    }

    return {
        db,
        addDataHeight,
        addDataWeight,
        getAllData,
        deleteDB
    }
}


export default useDatabase;