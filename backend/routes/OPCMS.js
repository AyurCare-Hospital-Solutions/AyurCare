// routes/prescriptions.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all prescriptions
router.get('/', async (req, res) => {
    try {
        const prescriptions = await db.query('SELECT * FROM Prescriptions');
        res.json(prescriptions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST a new prescription
router.post('/', async (req, res) => {
    const { diagnosis, note, dispensed_date, DispensedById, DoctorId, OPDAppointmentId } = req.body;
    try {
        await db.query(
            'INSERT INTO Prescriptions (diagnosis, note, dispensed_date, DispensedById, DoctorId, OPDAppointmentId) VALUES (?, ?, ?, ?, ?, ?)',
            [diagnosis, note, dispensed_date, DispensedById, DoctorId, OPDAppointmentId]
        );
        res.status(201).json({ message: 'Prescription created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// PUT update a prescription
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { diagnosis, note, dispensed_date, DispensedById, DoctorId, OPDAppointmentId } = req.body;
    try {
        await db.query(
            'UPDATE Prescriptions SET diagnosis=?, note=?, dispensed_date=?, DispensedById=?, DoctorId=?, OPDAppointmentId=? WHERE id=?',
            [diagnosis, note, dispensed_date, DispensedById, DoctorId, OPDAppointmentId, id]
        );
        res.json({ message: 'Prescription updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// DELETE a prescription
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Prescriptions WHERE id=?', [id]);
        res.json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;


module.exports = router;