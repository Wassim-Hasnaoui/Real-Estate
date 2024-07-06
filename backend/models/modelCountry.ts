// modelCountry.ts

import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../dbConfig/db';

interface Country {
    countryID: number;
    countryName: string;
}

const getCountries = async (): Promise<Country[]> => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM countrys');
        return rows as Country[];
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};

const addNewCountry = async (countryName: string): Promise<void> => {
    try {
        await pool.query<ResultSetHeader>('INSERT INTO countrys (countryName) VALUES (?)', [countryName]);
    } catch (error) {
        console.error('Error adding country:', error);
        throw error;
    }
};

const deleteCountry = async (countryID: number): Promise<void> => {
    try {
        await pool.query<ResultSetHeader>('DELETE FROM countrys WHERE countryID = ?', [countryID]);
    } catch (error) {
        console.error('Error deleting country:', error);
        throw error;
    }
};

export { getCountries, addNewCountry, deleteCountry, Country };
