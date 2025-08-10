import Router from "express";
import { addAddressController, getAllAddressController, selectAddressController } from "../controllers/address.controller.js";
import auth from "../middlewares/auth.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/get/:id", auth, getAllAddressController);
addressRouter.post("/select-address", auth, selectAddressController);

export default addressRouter;