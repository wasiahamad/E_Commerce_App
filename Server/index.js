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
import ordersRouter from './routes/orders.route.js'
import ramRouter from './routes/ram.route.js'
import sizeRouter from './routes/size.route.js'
import weightRouter from './routes/weight.route.js'
import notifyRouter from './routes/notify.route.js'
import adminRouter from './routes/admin.route.js'
import bannerRouter from './routes/banner.route.js'
import homeSliderRouter from './routes/homeSlider.route.js'
import AdminModel from './models/admin.model.js'
import bcrypt from 'bcrypt'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

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
app.use("/api/v1/order", ordersRouter);
app.use('/api/v1/ram', ramRouter);
app.use('/api/v1/size', sizeRouter);
app.use('/api/v1/weight', weightRouter);
app.use('/api/v1/notify', notifyRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/banner', bannerRouter);
app.use('/api/v1/homeSlider', homeSliderRouter);

// server start here
const PORT = process.env.PORT || 5000;
// Start server after DB connect and optional seeding
const startServer = async () => {
    try {
        await connectDB();

        // optional admin seeding from environment variables
        try {
            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPassword = process.env.ADMIN_PASSWORD;
            const adminName = process.env.ADMIN_NAME || 'Admin';

            if (adminEmail && adminPassword) {
                const existing = await AdminModel.findOne({ email: adminEmail.toLowerCase() });
                if (!existing) {
                    const hashed = await bcrypt.hash(adminPassword, 10);
                    const newAdmin = new AdminModel({ name: adminName, email: adminEmail.toLowerCase(), password: hashed, role: 'admin', status: 'active' });
                    await newAdmin.save();
                    console.log(`Seeded admin user: ${adminEmail}`);
                } else {
                    console.log(`Admin user already exists: ${adminEmail}`);
                }
            }
        } catch (seedErr) {
            console.error('Admin seeding error:', seedErr);
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
};

startServer();


