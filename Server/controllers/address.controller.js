import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";
import mongoose from 'mongoose';

export const addAddressController = async (req, res) => {
    try {
        const { address_line, city, state, country, pincode, mobile, status, selected } = req.body;
        const userId = req.body.userId;

        if (!userId) {
            return res.status(401).json({
                message: "User not logged in",
                error: true,
                success: false
            });
        }

        if (!address_line || !city || !state || !country || !pincode || !mobile) {
            return res.status(400).json({
                message: "All fields are required",
                error: true,
                success: false
            });
        }

        const address = new AddressModel({
            userId,
            address_line,
            city,
            state,
            country,
            pincode,
            mobile,
            status,
            selected
        });

        const savedAddress = await address.save();

        const updatedUserAddress = await UserModel.updateOne({ _id: userId }, {
            $push: {
                address_details: savedAddress._id
            }
        });

        res.status(200).json({
            message: "Address added successfully",
            error: false,
            success: true,
            data: savedAddress
        });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({
            message: "Error adding address",
            error: true,
            success: false
        });
    }
}

// get all address controller
export const getAllAddressController = async (req, res) => {
    try {
        const address = await AddressModel.find({
            userId: req?.user?.id
        }).populate("userId");

        console.log(address);

        if (!address) {
            return res.status(404).json({
                message: "Address not found",
                error: true,
                success: false
            });
        } else {
            const updateUser = await UserModel.updateOne({ _id: req?.user?.id }, {
                $push: {
                    address_details: address?._id
                }
            })
        }

        res.status(200).json({
            message: "Address fetched successfully",
            error: false,
            success: true,
            data: address
        });
    } catch (error) {
        console.error("Error fetching address:", error);
        res.status(500).json({
            message: "Error fetching address",
            error: true,
            success: false
        });
    }
}

// select address controller
// export const selectAddressController = async (req, res) => {
//     try {
//         const { addressId } = req.body;

//         if (!addressId) {
//             return res.status(400).json({
//                 message: "Address ID is required",
//                 error: true,
//                 success: false
//             });
//         }

//         const address = await AddressModel.findById(addressId);

//         if (!address) {
//             return res.status(404).json({
//                 message: "Address not found",
//                 error: true,
//                 success: false
//             });
//         }

//         const updatedUser = await UserModel.updateOne({ _id: req?.user?.id }, {
//             $set: {
//                 selected: addressId
//             }
//         });

//         res.status(200).json({
//             message: "Address selected successfully",
//             error: false,
//             success: true,
//             data: address
//         });
//     } catch (error) {
//         console.error("Error selecting address:", error);
//         res.status(500).json({
//             message: "Error selecting address",
//             error: true,
//             success: false
//         });
//     }
// }


export const selectAddressController = async (req, res) => {
    try {
        const { addressId } = req.body;
        const userId = req.user.id;

        if (!addressId) {
            return res.status(400).json({
                message: "Address ID is required",
                error: true,
                success: false
            });
        }

        const address = await AddressModel.findOne({ _id: addressId, userId });
        if (!address) {
            return res.status(404).json({
                message: "Address not found for this user",
                error: true,
                success: false
            });
        }

        // ✅ Sab addresses ka selected false
        await AddressModel.updateMany(
            { userId },
            { $set: { selected: false } }
        );

        // ✅ Sirf selected address ka selected true
        address.selected = true;
        await address.save();

        // ✅ User ke document me bhi update karo (optional)
        await UserModel.updateOne(
            { _id: userId },
            { $set: { selected: addressId } }
        );

        res.status(200).json({
            message: "Address selected successfully",
            error: false,
            success: true,
            data: address
        });
    } catch (error) {
        console.error("Error selecting address:", error);
        res.status(500).json({
            message: "Error selecting address",
            error: true,
            success: false
        });
    }
};

