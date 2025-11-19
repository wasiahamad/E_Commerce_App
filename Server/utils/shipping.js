// Simple shipping utility used by orders controller
// Supports: flat rate, free-above threshold, and basic weight-based surcharge when product weights are provided
import ProductModel from '../models/product.model.js';

/**
 * Compute shipping charge based on subtotal, items and destination address.
 * Rules (configurable here):
 * - If subtotal <= 0 => 0
 * - If subtotal >= FREE_THRESHOLD => 0
 * - Base rate for other orders is BASE_RATE
 * - If product weights available, add WEIGHT_RATE per kg
 * - Future: zone-based rates using address.pincode/state
 */
const FREE_THRESHOLD = 500; // free shipping over this subtotal
const BASE_RATE = 50; // default base shipping
const WEIGHT_RATE_PER_KG = 20; // extra per kg if weight provided

export async function computeShippingCharge({ subtotal = 0, items = [], address = null } = {}) {
    if (!subtotal || subtotal <= 0) return 0;
    if (subtotal >= FREE_THRESHOLD) return 0;

    // try to compute weight if product ids provided
    let totalWeightKg = 0;
    try {
        const productIds = items.map((it) => it.productId).filter(Boolean);
        if (productIds.length) {
            const products = await ProductModel.find({ _id: { $in: productIds } }).select('productWeight').lean();
            for (const p of products) {
                // productWeight stored as array of strings; try to parse numeric value if present
                const w = Array.isArray(p.productWeight) && p.productWeight.length ? p.productWeight[0] : null;
                if (w) {
                    const parsed = parseFloat(String(w).replace(/[^0-9.]/g, ''));
                    if (!isNaN(parsed)) totalWeightKg += parsed;
                }
            }
        }
    } catch (err) {
        // ignore weight failures and fallback to base rate
        console.error('computeShippingCharge weight lookup failed', err.message || err);
    }

    let charge = BASE_RATE;
    if (totalWeightKg > 0) {
        charge += WEIGHT_RATE_PER_KG * totalWeightKg;
    }

    // zone-based adjustments can be added here using address
    // e.g., if address.country !== 'India' -> additional fee

    // ensure numeric and round to 2 decimals
    return Math.max(0, Number(charge.toFixed(2)));
}

// Return detailed breakdown for debugging/UX: base, totalWeightKg, weightCharge, shippingCharge
export async function computeShippingDetails({ subtotal = 0, items = [], address = null } = {}) {
    if (!subtotal || subtotal <= 0) return { shippingCharge: 0, base: 0, totalWeightKg: 0, weightCharge: 0, freeThreshold: FREE_THRESHOLD };
    if (subtotal >= FREE_THRESHOLD) return { shippingCharge: 0, base: 0, totalWeightKg: 0, weightCharge: 0, freeThreshold: FREE_THRESHOLD };

    let totalWeightKg = 0;
    try {
        const productIds = items.map((it) => it.productId).filter(Boolean);
        if (productIds.length) {
            const products = await ProductModel.find({ _id: { $in: productIds } }).select('productWeight').lean();
            for (const p of products) {
                const w = Array.isArray(p.productWeight) && p.productWeight.length ? p.productWeight[0] : null;
                if (w) {
                    const parsed = parseFloat(String(w).replace(/[^0-9.]/g, ''));
                    if (!isNaN(parsed)) totalWeightKg += parsed;
                }
            }
        }
    } catch (err) {
        console.error('computeShippingDetails weight lookup failed', err.message || err);
    }

    const base = BASE_RATE;
    const weightCharge = totalWeightKg > 0 ? (WEIGHT_RATE_PER_KG * totalWeightKg) : 0;
    const shippingCharge = Math.max(0, Number((base + weightCharge).toFixed(2)));

    return { shippingCharge, base, totalWeightKg, weightCharge, freeThreshold: FREE_THRESHOLD };
}

export default { computeShippingCharge };
