import React from 'react';

function Button({ name, onClick, kind }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-blue-500 text-white text-sm px-6 py-3 rounded hover:opacity-80 transition"
      >
        {name}
      </button>   
    </div>   
  );
}

export default Button;
