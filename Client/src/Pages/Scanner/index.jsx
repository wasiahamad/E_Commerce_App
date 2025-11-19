import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { getData } from '../../utils/api';

export default function ScannerPage() {
    const readerRef = useRef(null);
    const [scanner, setScanner] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [lastCode, setLastCode] = useState('');
    const [result, setResult] = useState(null);
    const [manualInput, setManualInput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        return () => {
            // cleanup on unmount
            if (scanner) {
                scanner.clear().catch(() => { });
            }
        };
    }, [scanner]);

    const startScanner = async () => {
        setError('');
        if (!readerRef.current) return;
        try {
            const html5Qr = new Html5Qrcode(readerRef.current.id);
            setScanner(html5Qr);
            await html5Qr.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 300, height: 300 },
                },
                async (decodedText, decodedResult) => {
                    // handle on success
                    if (!decodedText) return;
                    if (decodedText === lastCode) return; // ignore duplicates
                    setLastCode(decodedText);
                    setScanning(false);
                    try {
                        await html5Qr.stop();
                    } catch (e) {
                        // ignore
                    }
                    fetchProduct(decodedText);
                },
                (errorMessage) => {
                    // decode error, ignore silently or show minor hint
                }
            );
            setScanning(true);
        } catch (err) {
            console.error('Scanner start error', err);
            setError('Could not start camera scanner. Please allow camera access or use manual input.');
        }
    };

    const stopScanner = async () => {
        if (!scanner) return;
        try {
            await scanner.stop();
            await scanner.clear();
        } catch (e) {
            // ignore
        }
        setScanning(false);
        setScanner(null);
    };

    const fetchProduct = async (code) => {
        setError('');
        setResult(null);
        try {
            const res = await getData(`/api/v1/product/code/${encodeURIComponent(code)}`);
            if (res && res.success) {
                setResult(res.data);
            } else {
                setError(res?.message || 'Product not found');
            }
        } catch (err) {
            console.error('Lookup error', err);
            setError('Lookup failed. Please try again.');
        }
    };

    const onManualSubmit = (e) => {
        e.preventDefault();
        if (!manualInput) return;
        fetchProduct(manualInput.trim());
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Product Scanner</h2>

            <div className="mb-4">
                <button className={`px-4 py-2 mr-3 rounded ${scanning ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`} onClick={() => (scanning ? stopScanner() : startScanner())}>
                    {scanning ? 'Stop Scanner' : 'Start Camera Scanner'}
                </button>
                <button className="px-4 py-2 rounded bg-gray-200" onClick={() => { setResult(null); setError(''); setManualInput(''); setLastCode(''); }}>
                    Clear
                </button>
            </div>

            <div id="reader" ref={readerRef} style={{ width: '100%', maxWidth: 640, height: 360, border: '1px solid #ddd' }}></div>

            <div className="mt-4">
                <form onSubmit={onManualSubmit} className="flex gap-2">
                    <input value={manualInput} onChange={(e) => setManualInput(e.target.value)} placeholder="Enter code manually or scan with USB scanner" className="border p-2 rounded flex-1" />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Lookup</button>
                </form>
                <p className="text-sm text-gray-500 mt-2">Tip: Many USB barcode scanners act like a keyboard — focus this input and scan, it will submit automatically if the scanner sends Enter.</p>
            </div>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {result && (
                <div className="mt-6 p-4 border rounded">
                    <h3 className="text-lg font-bold">{result.name}</h3>
                    <div className="flex gap-4 mt-3">
                        <div style={{ width: 180 }}>
                            {result.image && result.image.length > 0 && <img src={result.image[0]} alt={result.name} className="w-full h-auto object-cover" />}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">{result.description}</p>
                            <p className="mt-2"><strong>Price:</strong> ₹{result.price}</p>
                            <p><strong>Stock:</strong> {result.countInStock}</p>
                            <p><strong>Code:</strong> {result.code}</p>
                            <p><strong>Category:</strong> {result.catName || result.category?.name}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
