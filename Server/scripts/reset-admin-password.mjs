#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import AdminModel from '../models/admin.model.js';
import bcrypt from 'bcrypt';

async function main() {
  const email = process.argv[2] || process.env.ADMIN_EMAIL;
  const password = process.argv[3] || process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Usage: node reset-admin-password.mjs <email> <password>  OR set ADMIN_EMAIL and ADMIN_PASSWORD in env');
    process.exit(1);
  }

  try {
    await connectDB();
    const hashed = await bcrypt.hash(password, 10);
    const admin = await AdminModel.findOne({ email: email.toLowerCase() });
    if (admin) {
      admin.password = hashed;
      admin.status = 'active';
      await admin.save();
      console.log(`Updated password for admin ${email}`);
    } else {
      const newAdmin = new AdminModel({ name: process.env.ADMIN_NAME || 'Admin', email: email.toLowerCase(), password: hashed, role: 'admin', status: 'active' });
      await newAdmin.save();
      console.log(`Created new admin ${email}`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error resetting admin password', err);
    process.exit(1);
  }
}

main();
