import Router from "express";
import { addAddressController, deleteAddressController, getAllAddressController, selectAddressController, updateAddressController } from "../controllers/address.controller.js";
import auth from "../middlewares/auth.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddressController);
addressRouter.get("/get/:id", auth, getAllAddressController);
addressRouter.post("/select-address", auth, selectAddressController);
addressRouter.put("/update/:id", auth, updateAddressController);
addressRouter.delete("/delete/:id", auth, deleteAddressController);

export default addressRouter;