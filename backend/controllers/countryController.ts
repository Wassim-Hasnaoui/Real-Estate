// countryController.ts

import { Request, Response } from 'express';
import { getCountries, addNewCountry, deleteCountry } from '../models/modelCountry';

export const fetchCountries = async (req: Request, res: Response): Promise<void> => {
    try {
        const countries = await getCountries();
        res.status(200).json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
};

export const addCountry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { countryName } = req.body;
        if (!countryName) {
            res.status(400).json({ error: 'countryName is required' });
            return;
        }
        await addNewCountry(countryName);
        res.status(201).json({ message: 'Country added successfully' });
    } catch (error) {
        console.error('Error adding country:', error);
        res.status(500).json({ error: 'Failed to add country' });
    }
};

export const removeCountry = async (req: Request, res: Response): Promise<void> => {
    try {
        const countryID = Number(req.params.countryID);
        if (!countryID) {
            res.status(400).json({ error: 'countryID is required' });
            return;
        }
        await deleteCountry(countryID);
        res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error('Error deleting country:', error);
        res.status(500).json({ error: 'Failed to delete country' });
    }
};
