import {Router} from 'express';
import {addToMyList, deleteFromMyList, getMyList} from '../controllers/myList.controller.js';
import authMiddleware from '../middlewares/auth.js';


const myListRouter = Router();

myListRouter.get("/", authMiddleware, getMyList);
myListRouter.post("/add", authMiddleware, addToMyList);
myListRouter.delete("/remove/:id", authMiddleware, deleteFromMyList);


export default myListRouter;



