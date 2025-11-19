import WeightModel from '../models/weight.model.js';

// create a new Weight option
export const createWeight = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || String(name).trim() === '') {
            return res.status(400).json({ message: 'Name is required', success: false, error: true });
        }

        const existed = await WeightModel.findOne({ name: String(name).trim() });
        if (existed) {
            return res.status(409).json({ message: 'Weight already exists', success: false, error: true });
        }

        const item = new WeightModel({ name: String(name).trim() });
        await item.save();

        return res.status(201).json({ message: 'Weight created successfully', success: true, error: false, data: item });
    } catch (error) {
        console.error('Create Weight error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// get all Weights
export const getAllWeights = async (req, res) => {
    try {
        const items = await WeightModel.find().sort({ name: 1 }).exec();
        return res.status(200).json({ message: 'Weights fetched', success: true, error: false, data: items });
    } catch (error) {
        console.error('Get Weights error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// update weight
export const updateWeight = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        if (!name || String(name).trim() === '') {
            return res.status(400).json({ message: 'Name is required', success: false, error: true });
        }

        const item = await WeightModel.findByIdAndUpdate(id, { name: String(name).trim() }, { new: true });
        if (!item) return res.status(404).json({ message: 'Weight not found', success: false, error: true });

        return res.status(200).json({ message: 'Weight updated', success: true, error: false, data: item });
    } catch (error) {
        console.error('Update Weight error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// delete weight
export const deleteWeight = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await WeightModel.findByIdAndDelete(id);
        if (!item) return res.status(404).json({ message: 'Weight not found', success: false, error: true });
        return res.status(200).json({ message: 'Weight deleted', success: true, error: false });
    } catch (error) {
        console.error('Delete Weight error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// delete multiple weights
export const deleteMultipleWeights = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Invalid request', success: false, error: true });
        }
        await WeightModel.deleteMany({ _id: { $in: ids } });
        return res.status(200).json({ message: 'Weights deleted', success: true, error: false });
    } catch (error) {
        console.error('Delete multiple Weights error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};
