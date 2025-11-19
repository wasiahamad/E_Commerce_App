import { lookupByBarcode } from '../utils/productLookup.js';

const code = process.argv[2] || '8901491001120';

(async () => {
  try {
    const res = await lookupByBarcode(code);
    console.log('Lookup result for', code, ':');
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error testing lookup:', err);
    process.exit(1);
  }
})();
