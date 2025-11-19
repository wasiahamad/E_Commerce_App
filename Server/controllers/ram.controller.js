import RamModel from '../models/ram.model.js';

// create a new RAM option
export const createRam = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || String(name).trim() === '') {
            return res.status(400).json({ message: 'Name is required', success: false, error: true });
        }

        const existed = await RamModel.findOne({ name: String(name).trim() });
        if (existed) {
            return res.status(409).json({ message: 'RAM already exists', success: false, error: true });
        }

        const ram = new RamModel({ name: String(name).trim() });
        await ram.save();

        return res.status(201).json({ message: 'RAM created successfully', success: true, error: false, data: ram });
    } catch (error) {
        console.error('Create RAM error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// get all RAMs
export const getAllRams = async (req, res) => {
    try {
        const items = await RamModel.find().sort({ name: 1 }).exec();
        return res.status(200).json({ message: 'RAMs fetched', success: true, error: false, data: items });
    } catch (error) {
        console.error('Get RAMs error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// update ram
export const updateRam = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        if (!name || String(name).trim() === '') {
            return res.status(400).json({ message: 'Name is required', success: false, error: true });
        }

        const ram = await RamModel.findByIdAndUpdate(id, { name: String(name).trim() }, { new: true });
        if (!ram) return res.status(404).json({ message: 'RAM not found', success: false, error: true });

        return res.status(200).json({ message: 'RAM updated', success: true, error: false, data: ram });
    } catch (error) {
        console.error('Update RAM error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// delete ram
export const deleteRam = async (req, res) => {
    try {
        const id = req.params.id;
        const ram = await RamModel.findByIdAndDelete(id);
        if (!ram) return res.status(404).json({ message: 'RAM not found', success: false, error: true });
        return res.status(200).json({ message: 'RAM deleted', success: true, error: false });
    } catch (error) {
        console.error('Delete RAM error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// delete multiple rams
export const deleteMultipleRams = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Invalid request', success: false, error: true });
        }
        await RamModel.deleteMany({ _id: { $in: ids } });
        return res.status(200).json({ message: 'RAMs deleted', success: true, error: false });
    } catch (error) {
        console.error('Delete multiple RAMs error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};
