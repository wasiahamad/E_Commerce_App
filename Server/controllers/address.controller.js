import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
    try {
        const { address_line, city, state, country, pincode, mobile, status } = req.body;
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
            status
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