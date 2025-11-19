import React from "react";

const STATUS_CLASSES = {
    pending: 'bg-yellow-400 text-black',
    confirmed: 'bg-blue-600 text-white',
    shipped: 'bg-indigo-500 text-white',
    delivered: 'bg-green-500 text-white',
    cancelled: 'bg-red-500 text-white'
};

const Badge = ({ status = '' }) => {
    const key = String(status).toLowerCase();
    const classes = STATUS_CLASSES[key] || 'bg-gray-200 text-gray-800';

    return (
        <span className={`inline-block py-1 px-3 rounded-full text-[11px] capitalize ${classes}`}>
            {status}
        </span>
    );
};

export default Badge;
