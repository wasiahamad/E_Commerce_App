import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { getData, putData } from '../../utils/api';

const Scanner = () => {
  const readerRef = useRef(null);
  const [scanner, setScanner] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const manualInputRef = useRef(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [lastCode, setLastCode] = useState('');

  useEffect(() => {
    // focus manual input on mount so USB keyboard-scanners type into it
    try { manualInputRef.current && manualInputRef.current.focus(); } catch (e) {}

    return () => {
      if (scanner) {
        try {
          const maybePromise = scanner.clear();
          if (maybePromise && typeof maybePromise.catch === 'function') {
            maybePromise.catch(() => {});
          }
        } catch (e) {
          // ignore
        }
      }
    };
  }, [scanner]);

  const startScanner = async () => {
    setError('');
    if (!readerRef.current) return;
    try {
      const elementId = readerRef.current.id || 'admin-reader';
      const html5Qr = new Html5Qrcode(elementId);
      setScanner(html5Qr);

      // Try to get cameras and prefer back camera
      let cameraId = null;
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          // pick a camera that looks like back camera if label exists
          const back = devices.find(d => /back|rear|environment/i.test(d.label));
          cameraId = (back && back.id) || devices[0].id;
        }
      } catch (camErr) {
        console.warn('Could not get cameras list', camErr);
      }

      if (!cameraId) {
        // fallback to facingMode constraint if cameras list not available
        await html5Qr.start(
          { facingMode: { exact: 'environment' } },
          { fps: 10, qrbox: { width: 300, height: 300 } },
          onScanSuccess,
          onScanFailure
        );
      } else {
        await html5Qr.start(
          cameraId,
          { fps: 10, qrbox: { width: 300, height: 300 } },
          onScanSuccess,
          onScanFailure
        );
      }
      setScanning(true);
    } catch (err) {
      console.error('Scanner start error', err);
      setError('Could not access camera. Please allow camera or use manual input.');
    }
  };

  const onScanSuccess = async (decodedText) => {
    try {
      if (!decodedText) return;
      if (decodedText === lastCode) return;
      setLastCode(decodedText);
      setScanning(false);
      if (scanner) {
        try { await scanner.stop(); } catch (e) { console.warn('stop error', e); }
      }
      lookup(decodedText);
    } catch (e) {
      console.error('onScanSuccess error', e);
    }
  };

  const onScanFailure = (errorMessage) => {
    // optional: set a minor status or ignore
    // console.debug('scan failure', errorMessage);
  };

  const stopScanner = async () => {
    if (!scanner) return;
    try {
      await scanner.stop();
      await scanner.clear();
    } catch (e) {}
    setScanning(false);
    setScanner(null);
    // return focus to manual input so USB scanners can type
    try { manualInputRef.current && manualInputRef.current.focus(); } catch (e) {}
  };

  const lookup = async (code) => {
    setResult(null);
    setError('');
    setLastCode(code);
    try {
  // use the more-flexible admin search endpoint which tries multiple match strategies
  const res = await getData(`/api/v1/product/code-search/${encodeURIComponent(code)}`);
      if (res && res.success) setResult(res.data);
      else setError(res?.message || 'Product not found');
    } catch (err) {
      console.error('Lookup error', err);
      const msg = err?.response?.data?.message || err?.message || 'Lookup failed.';
      setError(msg);
    }
  };

  // assign scanned code to an existing product id (admin action)
  const [assignProductId, setAssignProductId] = useState('');
  const [assignStatus, setAssignStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchTimerRef = useRef(null);
  const [assignProductName, setAssignProductName] = useState('');

  const assignCodeToProduct = async (e) => {
    e && e.preventDefault();
    setAssignStatus('');
    if (!assignProductId) return setAssignStatus('Please enter a product id');
    try {
      const body = { code: lastCode, codeType: 'barcode' };
      const res = await putData(`/api/v1/product/set-code/${assignProductId}`, body);
      if (res && res.success) {
        setAssignStatus('Code assigned successfully');
        setResult(res.data);
        setError('');
      } else {
        setAssignStatus(res?.message || 'Failed to assign code');
      }
    } catch (err) {
      console.error('Assign error', err);
      setAssignStatus(err?.response?.data?.message || err?.message || 'Assign failed');
    }
  };

  const fetchSuggestions = async (q) => {
    if (!q || q.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await import('../../utils/api').then(m => m.searchProducts(q));
      if (res && res.success) setSuggestions(res.data || []);
      else setSuggestions([]);
    } catch (err) {
      console.error('Search suggestions error', err);
      setSuggestions([]);
    }
  };

  const onSearchChange = (val) => {
    setSearchQuery(val);
    setAssignProductId('');
    setAssignProductName('');
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const pickSuggestion = (item) => {
    setAssignProductId(item._id);
    setAssignProductName(item.name);
    setSearchQuery(item.name);
    setSuggestions([]);
  };

  const onManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInput) return;
    lookup(manualInput.trim());
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Admin Product Scanner</h1>

      <div className="mb-4">
        <button onClick={() => (scanning ? stopScanner() : startScanner())} className={`px-4 py-2 mr-3 rounded ${scanning ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
          {scanning ? 'Stop Scanner' : 'Start Camera Scanner'}
        </button>
        <button onClick={() => { setResult(null); setError(''); setManualInput(''); setLastCode(''); }} className="px-4 py-2 rounded bg-gray-200">Clear</button>
      </div>

      <div id="admin-reader" ref={readerRef} style={{ width: '100%', maxWidth: 720, height: 420, border: '1px dashed #ddd' }}></div>

      <form onSubmit={onManualSubmit} className="mt-4 flex gap-2">
        <input ref={manualInputRef} autoFocus value={manualInput} onChange={(e) => setManualInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onManualSubmit(e); } }} className="border p-2 rounded flex-1" placeholder="Enter or scan code with USB scanner" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Lookup</button>
      </form>

      {error && <div className="mt-3 text-red-600">{error}</div>}

      {/* If product not found, allow admin to assign this scanned code to a product by id */}
      {error && /not found/i.test(error) && lastCode && (
        <div className="mt-4 p-3 border rounded bg-yellow-50">
          <div className="mb-2 text-sm">Scanned code: <strong>{lastCode}</strong></div>
          <div className="mb-2 text-sm">Search product by name to assign this code</div>
          <form onSubmit={assignCodeToProduct} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search product by name" className="border p-2 rounded flex-1" />
              <button type="submit" className="bg-indigo-600 text-white px-3 py-2 rounded" disabled={!assignProductId}>Assign</button>
            </div>

            {suggestions && suggestions.length > 0 && (
              <ul className="border rounded bg-white max-h-40 overflow-auto mt-1">
                {suggestions.map(s => (
                  <li key={s._id} onClick={() => pickSuggestion(s)} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                    <div className="flex-1 text-sm">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.code || ''}</div>
                  </li>
                ))}
              </ul>
            )}

            {assignProductId && (
              <div className="mt-1 text-sm">Assigning to: <strong>{assignProductName || assignProductId}</strong></div>
            )}

            {assignStatus && <div className="mt-2 text-sm text-gray-700">{assignStatus}</div>}
          </form>
        </div>
      )}

      {result && (
        <div className="mt-4 border rounded p-4 bg-gray-50">
          <h2 className="text-lg font-bold">{result.name}</h2>
          <div className="flex gap-4 mt-3">
            <div style={{ width: 180 }}>
              {result.image && result.image.length > 0 && <img src={result.image[0]} alt={result.name} className="w-full h-auto object-cover" />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{result.description}</p>
              <p className="mt-2"><strong>Price:</strong> ₹{result.price}</p>
              <p><strong>Stock:</strong> {result.countInStock}</p>
              <p><strong>Code:</strong> {result.code}</p>
              <p><strong>Category:</strong> {result.catName || result.category?.name}</p>
              <div className="mt-3">
                <button onClick={() => window.location.href = `/product/${result._id}`} className="px-3 py-2 bg-blue-600 text-white rounded">Open Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
