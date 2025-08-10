import Router from "express";
import { addAddressController, getAllAddressController } from "../controllers/address.controller.js";
import auth from "../middlewares/auth.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/get/:id", auth, getAllAddressController);

export default addressRouter;