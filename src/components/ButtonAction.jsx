import React from 'react';

function Button({ name, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="bg-blue-400 text-white text-sm px-5 py-1 rounded hover:opacity-80 transition"
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
