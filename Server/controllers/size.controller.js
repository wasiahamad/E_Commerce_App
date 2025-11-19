import SizeModel from '../models/size.model.js';

// create a new Size option
export const createSize = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || String(name).trim() === '') {
            return res.status(400).json({ message: 'Name is required', success: false, error: true });
        }

        const existed = await SizeModel.findOne({ name: String(name).trim() });
        if (existed) {
            return res.status(409).json({ message: 'Size already exists', success: false, error: true });
        }

        const item = new SizeModel({ name: String(name).trim() });
        await item.save();

        return res.status(201).json({ message: 'Size created successfully', success: true, error: false, data: item });
    } catch (error) {
        console.error('Create Size error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// get all Sizes
export const getAllSizes = async (req, res) => {
    try {
        const items = await SizeModel.find().sort({ name: 1 }).exec();
        return res.status(200).json({ message: 'Sizes fetched', success: true, error: false, data: items });
    } catch (error) {
        console.error('Get Sizes error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// update size
export const updateSize = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        if (!name || String(name).trim() === '') {
            return res.status(400).json({ message: 'Name is required', success: false, error: true });
        }

        const item = await SizeModel.findByIdAndUpdate(id, { name: String(name).trim() }, { new: true });
        if (!item) return res.status(404).json({ message: 'Size not found', success: false, error: true });

        return res.status(200).json({ message: 'Size updated', success: true, error: false, data: item });
    } catch (error) {
        console.error('Update Size error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// delete size
export const deleteSize = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await SizeModel.findByIdAndDelete(id);
        if (!item) return res.status(404).json({ message: 'Size not found', success: false, error: true });
        return res.status(200).json({ message: 'Size deleted', success: true, error: false });
    } catch (error) {
        console.error('Delete Size error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// delete multiple sizes
export const deleteMultipleSizes = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Invalid request', success: false, error: true });
        }
        await SizeModel.deleteMany({ _id: { $in: ids } });
        return res.status(200).json({ message: 'Sizes deleted', success: true, error: false });
    } catch (error) {
        console.error('Delete multiple Sizes error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};
