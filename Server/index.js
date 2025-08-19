import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import myListRouter from './routes/myList.route.js'
import addressRouter from './routes/address.route.js'

const app = express();
dotenv.config();
// app.options('*', cors())
// In your main app.js/server.js file:
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet(
    {
        crossOriginResourcePolicy: false
    }
));

// routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use('/api/v1/user', userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/myList", myListRouter);
app.use("/api/v1/address", addressRouter);

// server start here
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


