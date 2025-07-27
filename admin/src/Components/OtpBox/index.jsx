import React, { useState } from 'react'

const OtpBox = ({ length, onChange }) => {
    const [opt, setOpt] = useState(new Array(length).fill(''));

    const handleChange = (element, index) => {
        const value = element.value;

        if (isNaN(value)) {
            return;
        }

        // update otp value 
        const newOpt = [...opt];
        newOpt[index] = value;
        setOpt(newOpt);
        onChange(newOpt.join(''));

        // focus next input
        if (value && index < length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !opt[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }h
    }

    return (
        <div className="optBox flex justify-center gap-1">
            {opt.map((data, index) => (
                <input
                    key={index}
                    type="text"
                    className="otp-input w-[45px] h-[45px] text-center text-[17px]"
                    id={`otp-input-${index}`}
                    maxLength="1"
                    value={opt[index]}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </div>
    )
}

export default OtpBox