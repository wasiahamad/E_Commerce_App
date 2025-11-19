import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { getData } from '../../utils/api';

const Scanner = ({ open, onClose, onDetected }) => {
    const qrRegionId = 'html5qr-region';
    const html5QrCodeRef = useRef(null);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        if (!open) return;

        const startScanner = async () => {
            try {
                const config = { fps: 10, qrbox: { width: 250, height: 90 } };
                html5QrCodeRef.current = new Html5Qrcode(qrRegionId, { verbose: false });

                await html5QrCodeRef.current.start(
                    { facingMode: 'environment' },
                    config,
                    async (decodedText, decodedResult) => {
                        // got a code
                        setScanning(false);
                        try {
                            await html5QrCodeRef.current.stop();
                        } catch (e) { /* ignore */ }
                        if (onDetected) onDetected(decodedText);
                    },
                    (errorMessage) => {
                        // parse errors or no-op
                    }
                );
                setScanning(true);
            } catch (err) {
                console.error('Scanner start error', err);
            }
        };

        startScanner();

        return () => {
            (async () => {
                try {
                    if (html5QrCodeRef.current && html5QrCodeRef.current.getState && html5QrCodeRef.current.getState() === Html5Qrcode.SCAMode) {
                        await html5QrCodeRef.current.stop();
                    } else if (html5QrCodeRef.current) {
                        try { await html5QrCodeRef.current.stop(); } catch (e) { }
                    }
                } catch (e) { }
                html5QrCodeRef.current = null;
            })();
        };
    }, [open, onDetected]);

    if (!open) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
            <div className='bg-white rounded p-4 w-[90vw] max-w-[520px]'>
                <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold'>Scan Product</h3>
                    <button onClick={onClose} className='text-sm text-gray-600'>Close</button>
                </div>
                <div id={qrRegionId} style={{ width: '100%', minHeight: 180 }}></div>
                <div className='mt-3 text-sm text-gray-600'>Point the camera at the product barcode. Scanning will stop automatically when a code is detected.</div>
            </div>
        </div>
    );
};

export default Scanner;
