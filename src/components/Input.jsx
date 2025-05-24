// src/components/Input.jsx
import React from 'react';

const Input = ({ label, name, value, placeholder, readOnly }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2">{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default Input;
