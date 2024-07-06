// countryRoutes.ts

import express from 'express';
import { fetchCountries, addCountry, removeCountry } from '../controllers/countryController';

const router = express.Router();

router.get('/all', fetchCountries);
router.post('/add', addCountry);
router.delete('/delete/:countryID', removeCountry); // New delete endpoint

export default router;
