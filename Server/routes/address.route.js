import Router from "express";
import { addAddressController } from "../controllers/address.controller.js";
import auth from "../middlewares/auth.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);

export default addressRouter;