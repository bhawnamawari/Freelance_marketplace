import React from "react";

const Textarea = ({
    label,
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block mb-2 font-medium">
                    {label}
                </label>
            )}

            <textarea
                rows="5"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border rounded-lg p-3 outline-none"
            />
        </div>
    );
};

export default Textarea;