import {Router} from 'express';
import {forgotPassword, loginUser, logoutUser, refreshToken, registerUser, removeUserImage, resetPaaword, resetPasswordWithOtp, updateUser, uploadUserImage, userDetails, verifyForgotPasswordOtp, verifyUserEmail } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.js';
import { upload } from '../middlewares/multer.js';


const userRouter = Router();
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/verify-otp", verifyForgotPasswordOtp);
userRouter.post("/resetPassword", resetPaaword);
userRouter.post("/resetPasswordWithOtp", resetPasswordWithOtp);


userRouter.post('/register', registerUser);
userRouter.post("/verify-email", verifyUserEmail);
userRouter.post("/login", loginUser);
userRouter.post("/logout",authMiddleware, logoutUser);
userRouter.put("/avatar", authMiddleware,upload.array("avatar"), uploadUserImage);
userRouter.delete("/delete-avatar", authMiddleware, removeUserImage);
userRouter.put("/:id", authMiddleware, updateUser);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/details", authMiddleware, userDetails);

export default userRouter;