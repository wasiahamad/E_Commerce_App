import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import { sendEmailFun } from "../utils/sendEmail.js";
import generateAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { verify } from "crypto";
import { sendEmail } from "../utils/EmailService.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";

// Initialize Cloudinary
const cloudinaryConfig = {
    cloud_name: process.env.CLOUDNARY_NAME, // Replace with your Cloudinary cloud name
    api_key: process.env.CLOUDNARY_API_KEY, // Replace with your Cloudinary API key
    api_secret: process.env.CLOUDNARY_API_SECRET, // Replace with your Cloudinary API secret
    secure: true, // Use secure URLs
};
cloudinary.config(cloudinaryConfig);

// User registration controller write the same code but order the code in a better way
export const registerUser = async (req, res) => {
    try {
        let user;
        const { name, email, password } = req.body;

        // validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                error: true,
                success: false,
            });
        }

        // Check if user already exists
        user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                error: true,
                success: false,
            });
        }

        // create verifyCode for user
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (!verifyCode) {
            return res.status(500).json({
                message: "Error generating verification code",
                error: true,
                success: false,
            });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
                error: true,
                success: false,
            });
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
            return res.status(400).json({
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                error: true,
                success: false,
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        if (!salt) {
            return res.status(500).json({
                message: "Error generating salt for password hashing",
                error: true,
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new UserModel({
            name: name,
            email: email.toLowerCase(),
            password: hashedPassword,
            otp: verifyCode,
            otp_expiry: Date.now() + 10 * 60 * 1000, //  10 min expiry
        });

        // Save the user to the database
        await user.save();

        // send verification email
        const verifyEmail = await sendEmailFun({
            to: email,
            subject: "Verify your email from E-commerce App",
            text: `Your verification code is ${verifyCode}`,
            html: verifyEmailTemplate({
                username: name,
                verificationLink: `${process.env.CLIENT_URL}/verify-email?code=${verifyCode}&email=${email}`,
                otp: verifyCode,
            }),
        });

        if (!verifyEmail) {
            return res.status(500).json({
                message: "Error sending verification email",
                error: true,
                success: false,
            });
        }

        // create token for user
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            {}
        );

        if (!token) {
            return res.status(500).json({
                message: "Error generating token",
                error: true,
                success: false,
            });
        }

        res.status(201).json({
            message: "User registered successfully",
            error: false,
            success: true,
            token: token,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// verify user email
export const verifyUserEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }
        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid verification code",
                error: true,
                success: false,
            });
        }
        if (user.otp_expiry < Date.now()) {
            return res.status(400).json({
                message: "Verification code expired",
                error: true,
                success: false,
            });
        }
        user.verify_email = true;
        user.otp = null;
        user.otp_expiry = null;
        await user.save();
        return res.status(200).json({
            message: "User verified successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// Login user controller
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        if (user.status !== "active") {
            return res.status(400).json({
                message: "Contact to admin",
                error: true,
                success: false,
            });
        }

        if (!user.verify_email) {
            return res.status(400).json({
                message: "Please verify your email first",
                error: true,
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: true,
                success: false,
            });
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        if (!accessToken || !refreshToken) {
            return res.status(500).json({
                message: "Token generation failed",
                error: true,
                success: false,
            });
        }

        await UserModel.findByIdAndUpdate(
            user._id,
            { last_login_date: Date.now() },
            { new: true }
        );

        // ✅ Environment-based cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none", // Adjust based on your requirements
            maxAge: 24 * 60 * 60 * 1000,
        };

        res.cookie("refreshToken", refreshToken, cookieOptions);
        res.cookie("accessToken", accessToken, cookieOptions);

        return res.status(200).json({
            message: "User logged in successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};


// Logout user controller
export const logoutUser = async (req, res) => {
    try {
        const userId = req.query.userId; // Get user ID from query parameter 
        // if (!userId) {
        //     return res.status(400).json({
        //         message: "User ID is required",
        //         error: true,
        //         success: false,
        //     });
        // }

        // Clear cookies
        res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "none" });
        res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "none" });

        await UserModel.findByIdAndUpdate(userId, {
            refresh_token: "",
        });

        return res.status(200).json({
            message: "User logged out successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// image upload controller
let imagesArr = [];
export const uploadUserImage = async (req, res) => {
    try {
        imagesArr = [];
        const userId = req.user.id; // or whatever field you set in the JWT

        const image = req.files;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        // Check if the image exists in Cloudinary(first image remove and then upload new image)
        const prevImage = user.avatar;
        const urlArr = prevImage.split("/");
        const imagePrev = urlArr[urlArr.length - 1].split(".")[0];

        if (imagePrev) {
            const result = await cloudinary.uploader.destroy(imagePrev, (error, result) => {
                if (error) {
                    console.error("Cloudinary delete error:", error);
                    return res.status(500).json({
                        message: "Error removing image from Cloudinary",
                        error: true,
                        success: false,
                    });
                }
                console.log("Image deleted:", imagePrev);
                return res.status(200).json({
                    message: "Image removed successfully",
                    error: false,
                    success: true,
                });
            });
        }

        // console.log(user);
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {
            const result = await cloudinary.uploader.upload(image[i].path, options);
            imagesArr.push(result.secure_url);
            fs.unlinkSync(image[i].path); // Clean up local file
        }

        user.avatar = imagesArr[0]; // Save the first uploaded image
        await user.save();

        return res.status(200).json({
            message: "Image uploaded successfully",
            error: false,
            success: true,
            data: imagesArr,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// remove user image controller
export const removeUserImage = async (req, res) => {
    try {
        const imageUrl = req.query.img; // Get image URL from request body
        const urlArr = imageUrl.split("/");
        const image = urlArr[urlArr.length - 1].split(".")[0]; // Extract image name from URL

        // Check if the image exists in Cloudinary
        if (image) {
            const result = await cloudinary.uploader.destroy(image, (error, result) => {
                if (error) {
                    console.error("Cloudinary delete error:", error);
                    return res.status(500).json({
                        message: "Error removing image from Cloudinary",
                        error: true,
                        success: false,
                    });
                }
                console.log("Image deleted:", image);
                return res.status(200).json({
                    message: "Image removed successfully",
                    error: false,
                    success: true,
                });
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// update user controller
export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, mobile, password } = req.body;

        const userExist = await UserModel.findById(userId);
        console.log("USER EXIST:", userExist);
        if (!userExist) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        let verifyCode = "";
        if (email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }

        // password 
        let hashedPassword = "";
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        } else {
            hashedPassword = userExist.password;
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            {
                name: name,
                email: email,
                mobile: mobile,
                verify_email: email === userExist.email ? userExist.verify_email : false,
                password: hashedPassword,
                otp: verifyCode !== "" ? verifyCode : userExist.otp,
                otp_expiry: verifyCode !== "" ? Date.now() + 5 * 60 * 1000 : userExist.otp_expiry,
            },
            { new: true }
        )

        console.log("UPDATED USER:", updatedUser);

        if (email !== userExist.email) {
            const verifyEmail = await sendEmailFun({
                to: email,
                subject: "Verify your email from E-commerce App",
                text: `Your verification code is ${verifyCode}`,
                html: verifyEmailTemplate({
                    username: name,
                    verificationLink: `${process.env.CLIENT_URL}/verify-email?code=${verifyCode}&email=${email}`,
                    otp: verifyCode,
                }),
            });

            if (!verifyEmail) {
                return res.status(500).json({
                    message: "Error sending verification email",
                    error: true,
                    success: false,
                });
            }
        }
        return res.status(200).json({
            message: "User updated successfully",
            error: false,
            success: true,
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// forgot password controller
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // 1. Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Email not registered",
                error: true,
                success: false,
            });
        }

        // 2. Generate OTP and set expiry
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otp_expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

        // 3. Save updated user
        await user.save();

        // 4. Send email
        const sendResult = await sendEmailFun({
            to: email,
            subject: "Reset your password - E-commerce App",
            text: `Your OTP is ${otp}`,
            html: forgotPasswordTemplate({
                username: user.name,
                verificationLink: `${process.env.CLIENT_URL}/reset-password?code=${otp}&email=${email}`,
                otp,
            }),
        });

        if (!sendResult.success) {
            return res.status(500).json({
                message: "Failed to send email",
                error: true,
                success: false,
            });
        }

        // 5. Success response
        return res.status(200).json({
            message: "OTP sent to your email",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
};

// verify forgot password controller 
export const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1. Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Email not registered",
                error: true,
                success: false,
            });
        }

        // 2. Check if OTP is valid
        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false,
            });
        }

        // 3. Check if OTP has expired
        if (user.otp_expiry !== null && user.otp_expiry < Date.now()) {
            return res.status(400).json({
                message: "OTP has expired",
                error: true,
                success: false,
            });
        }

        // 4. Update user's password
        // user.password = await bcrypt.hash(req.body.password, 10);
        user.otp = null;
        user.otp_expiry = null;
        await user.save();

        // 5. Success response
        return res.status(200).json({
            message: "OTP is valid",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
};

// Reset password controller
export const resetPaaword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.status(404).json({
                message: "All Fields are required",
                error: true,
                success: false,
            });
        }

        // check if user exist 
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(404).json({
                message: "newPassword and confirmPassword must be same",
                error: true,
                success: false,
            });
        }

        // update user password 
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({
            message: "Password reset successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
}

// refresh token controller
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];

        if (!refreshToken) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false,
            });
        }

        // verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false,
            });
        }

        // const user = await UserModel.findOne({ _id: decoded.id });
        const userId = decoded?.id;
        const accessToken = await generateAccessToken(userId);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        };

        res.cookie("accessToken", accessToken, cookieOptions);

        return res.status(200).json({
            message: "Token refreshed successfully",
            error: false,
            success: true,
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
}

// get login user details controller 
export const userDetails = async (req, res) => {
    try {
        const userId = req.user.id; // or whatever field you set in the JWT
        console.log("USER ID:", userId);

        const user = await UserModel.findById(userId).select("-password -refresh_token");
        return res.status(200).json({
            message: "User details fetched successfully",
            error: false,
            success: true,
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
}










