import fetch from 'node-fetch';

// Utility to call external product lookup services by barcode
// Tries OpenFoodFacts (no API key) first, then UPCitemdb trial endpoint if available.
// Returns normalized product object or null.

const mapOpenFoodFacts = (data) => {
    const p = data.product || {};
    return {
        name: p.product_name || p.generic_name || '',
        brand: (p.brands && typeof p.brands === 'string') ? p.brands.split(',')[0].trim() : (p.brand || ''),
        description: p.ingredients_text || p.generic_name || '',
        images: [p.image_front_url, p.image_small_url].filter(Boolean),
        manufacturer: p.manufacturing_places || p.manufacturers || '',
        source: 'openfoodfacts'
    };
};

const mapUpcItemDb = (item) => {
    // item shape from upcitemdb: title, brand, description, images[]
    return {
        name: item.title || item.description || '',
        brand: item.brand || '',
        description: item.description || '',
        images: Array.isArray(item.images) ? item.images : (item.image ? [item.image] : []),
        manufacturer: item.manufacturer || '',
        source: 'upcitemdb'
    };
};

export async function lookupByBarcode(barcode) {
    if (!barcode) return null;

    const code = String(barcode).trim();

    // 1) Try OpenFoodFacts (good for many packaged food items, no API key required)
    try {
        const offRes = await fetch(`https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(code)}.json`);
        if (offRes && offRes.status === 200) {
            const offJson = await offRes.json();
            if (offJson && offJson.status === 1) {
                return mapOpenFoodFacts(offJson);
            }
        }
    } catch (offErr) {
        // ignore and continue
        console.error('OpenFoodFacts lookup error', offErr && offErr.message ? offErr.message : offErr);
    }

    // 2) Try UPCItemDB trial endpoint (may be rate-limited). If you have an API key, put it in UPCITEMDB_API_KEY
    try {
        const upcKey = process.env.UPCITEMDB_API_KEY || '';
        const url = `https://api.upcitemdb.com/prod/trial/lookup?upc=${encodeURIComponent(code)}`;
        const headers = { 'Content-Type': 'application/json' };
        if (upcKey) headers['user_key'] = upcKey;

        const upcRes = await fetch(url, { headers, method: 'GET' });
        if (upcRes && upcRes.status === 200) {
            const upcJson = await upcRes.json();
            if (upcJson && Array.isArray(upcJson.items) && upcJson.items.length > 0) {
                // pick first item
                return mapUpcItemDb(upcJson.items[0]);
            }
        }
    } catch (upcErr) {
        console.error('UPCItemDB lookup error', upcErr && upcErr.message ? upcErr.message : upcErr);
    }

    // 3) Not found in external sources
    return null;
}

export default { lookupByBarcode };
