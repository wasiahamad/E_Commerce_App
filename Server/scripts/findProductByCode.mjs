import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import ProductModel from '../models/product.model.js';

async function main() {
  const codeArg = process.argv[2];
  if (!codeArg) {
    console.error('Usage: node scripts/findProductByCode.mjs <code>');
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const code = String(codeArg).trim();

    // 1) exact match
    let product = await ProductModel.findOne({ code: code }).populate('category');

    // 2) digits-only
    if (!product) {
      const digits = code.replace(/\D/g, '');
      if (digits && digits !== code) {
        product = await ProductModel.findOne({ code: digits }).populate('category');
      }
    }

    // 3) contains (case-insensitive)
    if (!product) {
      product = await ProductModel.findOne({ code: { $regex: code, $options: 'i' } }).populate('category');
    }

    if (!product) {
      console.log(`No product found for code: ${code}`);
      process.exit(0);
    }

    console.log('Product found:');
    console.log(JSON.stringify(product.toObject(), null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
