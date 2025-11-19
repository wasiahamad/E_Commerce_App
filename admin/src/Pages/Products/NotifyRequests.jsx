import React, { useEffect, useState } from 'react';
import { getData, putData, deleteData } from '../../utils/api';

const NotifyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await getData('/api/v1/notify');
            if (res && res.success) setRequests(res.data || []);
        } catch (err) {
            console.error('Error fetching notify requests', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRequests(); }, []);

    const handleMark = async (id) => {
        try {
            const res = await putData(`/api/v1/notify/${id}/mark`, {});
            if (res && res.success) {
                fetchRequests();
            }
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteData(`/api/v1/notify/${id}`);
            if (res && res.success) fetchRequests();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Notify Requests</h2>
            {loading ? (
                <div>Loading...</div>
            ) : requests.length === 0 ? (
                <div>No notify requests.</div>
            ) : (
                <div className="space-y-3">
                    {requests.map(r => (
                        <div key={r._id} className="p-3 border rounded flex justify-between items-start gap-4">
                            <div>
                                <div className="font-semibold">{r.productName}</div>
                                <div className="text-sm text-gray-600">User: {r.userName} &lt;{r.userEmail}&gt;</div>
                                <div className="text-sm text-gray-500">Requested: {new Date(r.createdAt).toLocaleString()}</div>
                                <div className="text-sm text-gray-500">Notified: {r.notified ? new Date(r.notifiedAt).toLocaleString() : 'No'}</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {!r.notified && (<button className="btn-org px-3 py-1" onClick={() => handleMark(r._id)}>Mark as Notified</button>)}
                                <button className="btn px-3 py-1" onClick={() => handleDelete(r._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotifyRequests;
