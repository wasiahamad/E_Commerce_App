import HomeSliderModel from '../models/homeSlider.model.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
    secure: true
});

// Public: get active home sliders ordered by `order`
export const getPublicHomeSliders = async (req, res) => {
    try {
        const items = await HomeSliderModel.find({ active: true }).sort({ order: 1 }).exec();
        return res.status(200).json({ message: 'Home sliders fetched', success: true, error: false, data: items });
    } catch (error) {
        console.error('Get home sliders error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Admin: get all
export const getAllHomeSliders = async (req, res) => {
    try {
        const items = await HomeSliderModel.find().sort({ order: 1 }).exec();
        return res.status(200).json({ message: 'All home sliders fetched', success: true, error: false, data: items });
    } catch (error) {
        console.error('Get all home sliders error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Admin: create (accepts single image file field named 'image')
export const createHomeSlider = async (req, res) => {
    try {
        let imgUrl = '';
        let publicId = '';

        if (req.file) {
            try {
                const up = await cloudinary.uploader.upload(req.file.path, { folder: 'home_sliders' });
                imgUrl = up.secure_url || up.url || '';
                publicId = up.public_id || '';
                try { fs.unlinkSync(req.file.path); } catch (e) { }
            } catch (uErr) {
                console.error('Cloudinary upload error', uErr);
            }
        }

        if (!imgUrl && !req.body.img) {
            return res.status(400).json({ message: 'Image is required', success: false, error: true });
        }

        const item = new HomeSliderModel({
            img: imgUrl || req.body.img || '',
            cloudinary_id: publicId || req.body.cloudinary_id || '',
            order: req.body.order ? Number(req.body.order) : 0,
            active: req.body.active === undefined ? true : (req.body.active === 'true' || req.body.active === true),
            createdBy: req.user ? req.user.id : null
        });

        const saved = await item.save();
        return res.status(201).json({ message: 'Home slider created', success: true, error: false, data: saved });
    } catch (error) {
        console.error('Create home slider error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Admin: update
export const updateHomeSlider = async (req, res) => {
    try {
        const id = req.params.id;
        const existing = await HomeSliderModel.findById(id);
        if (!existing) return res.status(404).json({ message: 'Home slider not found', success: false, error: true });

        let imgUrl = existing.img || '';
        let newPublicId = existing.cloudinary_id || '';
        if (req.file) {
            try {
                const up = await cloudinary.uploader.upload(req.file.path, { folder: 'home_sliders' });
                imgUrl = up.secure_url || up.url || '';
                newPublicId = up.public_id || newPublicId;
                try { fs.unlinkSync(req.file.path); } catch (e) { }
            } catch (uErr) {
                console.error('Cloudinary upload error', uErr);
            }
        }

        const updateData = {
            img: imgUrl,
            cloudinary_id: newPublicId || existing.cloudinary_id || '',
            order: req.body.order !== undefined ? Number(req.body.order) : existing.order,
            active: req.body.active !== undefined ? (req.body.active === 'true' || req.body.active === true) : existing.active,
        };

        const updated = await HomeSliderModel.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({ message: 'Home slider updated', success: true, error: false, data: updated });
    } catch (error) {
        console.error('Update home slider error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Admin: delete
export const deleteHomeSlider = async (req, res) => {
    try {
        const id = req.params.id;
        const existing = await HomeSliderModel.findById(id);
        if (!existing) return res.status(404).json({ message: 'Home slider not found', success: false, error: true });

        try {
            if (existing.cloudinary_id) {
                await cloudinary.uploader.destroy(existing.cloudinary_id);
            } else if (existing.img) {
                const publicId = existing.img.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
        } catch (e) { console.error('Cloudinary delete error', e); }

        await HomeSliderModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Home slider deleted', success: true, error: false });
    } catch (error) {
        console.error('Delete home slider error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};
