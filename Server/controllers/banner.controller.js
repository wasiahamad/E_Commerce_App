import BannerModel from "../models/banner.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
    secure: true
});

// Public: get active banners ordered by `order`
export const getPublicBanners = async (req, res) => {
    try {
        const banners = await BannerModel.find({ active: true }).sort({ order: 1 }).exec();
        return res.status(200).json({ message: 'Banners fetched', success: true, error: false, data: banners });
    } catch (error) {
        console.error('Get banners error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Admin: get all banners (including inactive)
export const getAllBanners = async (req, res) => {
    try {
        const banners = await BannerModel.find().sort({ order: 1 }).exec();
        return res.status(200).json({ message: 'All banners fetched', success: true, error: false, data: banners });
    } catch (error) {
        console.error('Get all banners error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Admin: create banner (supports image upload)
export const createBanner = async (req, res) => {
    try {
    let imgUrl = '';
    let bannerPublicId = '';

        // if file uploaded, upload to cloudinary
        if (req.files && req.files.length > 0) {
            try {
                const up = await cloudinary.uploader.upload(req.files[0].path, { folder: 'banners' });
                imgUrl = up.secure_url || up.url || '';
                // store public_id for reliable deletion later
                bannerPublicId = up.public_id || '';
                try { fs.unlinkSync(req.files[0].path); } catch (e) { }
            } catch (uErr) {
                console.error('Cloudinary upload error', uErr);
            }
        }

        const banner = new BannerModel({
            title: req.body.title || '',
               listType: req.body.listType || '',
            price: req.body.price || '',
            img: imgUrl || req.body.img || '',
            cloudinary_id: bannerPublicId || req.body.cloudinary_id || '',
            link: req.body.link || '',
            cta: req.body.cta || '',
            position: req.body.position || 'center',
            // store category references if provided (allow client to build links)
            category: req.body.category || null,
            subCategory: req.body.subCategory || null,
            thirdCategory: req.body.thirdCategory || null,
            order: req.body.order ? Number(req.body.order) : 0,
            active: req.body.active === undefined ? true : (req.body.active === 'true' || req.body.active === true),
            createdBy: req.user ? req.user.id : null
        });

        const saved = await banner.save();
        return res.status(201).json({ message: 'Banner created', success: true, error: false, data: saved });

    } catch (error) {
        console.error('Create banner error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Admin: update banner (optionally replace image)
export const updateBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const existing = await BannerModel.findById(id);
        if (!existing) return res.status(404).json({ message: 'Banner not found', success: false, error: true });

        let imgUrl = existing.img || '';
        let newPublicId = existing.cloudinary_id || '';
        if (req.files && req.files.length > 0) {
            try {
                const up = await cloudinary.uploader.upload(req.files[0].path, { folder: 'banners' });
                imgUrl = up.secure_url || up.url || '';
                newPublicId = up.public_id || newPublicId;
                try { fs.unlinkSync(req.files[0].path); } catch (e) { }
            } catch (uErr) {
                console.error('Cloudinary upload error', uErr);
            }
        }

        const updateData = {
            title: req.body.title !== undefined ? req.body.title : existing.title,
            price: req.body.price !== undefined ? req.body.price : existing.price,
            img: imgUrl,
            cloudinary_id: newPublicId || existing.cloudinary_id || '',
            link: req.body.link !== undefined ? req.body.link : existing.link,
            cta: req.body.cta !== undefined ? req.body.cta : existing.cta,
            position: req.body.position !== undefined ? req.body.position : existing.position,
            category: req.body.category !== undefined ? req.body.category : existing.category,
            subCategory: req.body.subCategory !== undefined ? req.body.subCategory : existing.subCategory,
            thirdCategory: req.body.thirdCategory !== undefined ? req.body.thirdCategory : existing.thirdCategory,
            price: req.body.price !== undefined ? req.body.price : existing.price,
                order: req.body.order !== undefined ? Number(req.body.order) : existing.order,
                active: req.body.active !== undefined ? (req.body.active === 'true' || req.body.active === true) : existing.active,
                listType: req.body.listType !== undefined ? req.body.listType : existing.listType,
        };

        const updated = await BannerModel.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({ message: 'Banner updated', success: true, error: false, data: updated });

    } catch (error) {
        console.error('Update banner error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Admin: delete banner
export const deleteBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const existing = await BannerModel.findById(id);
        if (!existing) return res.status(404).json({ message: 'Banner not found', success: false, error: true });

        // try delete image from cloudinary (best-effort)
        try {
            // Prefer stored public_id for deletion
            if (existing.cloudinary_id) {
                await cloudinary.uploader.destroy(existing.cloudinary_id);
            } else if (existing.img) {
                const publicId = existing.img.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
        } catch (e) { console.error('Cloudinary delete error', e); }

        await BannerModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Banner deleted', success: true, error: false });
    } catch (error) {
        console.error('Delete banner error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};
