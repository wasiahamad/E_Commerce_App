import {Router} from 'express';
import {forgotPassword, getAllUsers, getUserById, loginUser, logoutUser, refreshToken, registerUser, removeUserImage, resetPaaword, resetPasswordWithOtp, searchUsers, updateUser, uploadUserImage, userDetails, verifyForgotPasswordOtp, verifyUserEmail } from '../controllers/user.controller.js';
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
userRouter.get("/all", authMiddleware, getAllUsers);
// search users (admin)
userRouter.get("/search", authMiddleware, searchUsers);
// unauthenticated test route for search (helps troubleshoot auth vs controller errors)
userRouter.get("/search-test", async (req, res, next) => {
	try {
		// delegate to controller module (it will read req.query)
		const mod = await import('../controllers/user.controller.js');
		// call controller; it will send response
		return mod.searchUsers(req, res, next);
	} catch (err) {
		console.error('[user.route] /search-test error:', err && err.stack ? err.stack : err);
		return res.status(500).json({ error: true, success: false, message: 'search-test failed' });
	}
});
// Get single user by id (admin)
userRouter.get("/:id", authMiddleware, getUserById);

export default userRouter;