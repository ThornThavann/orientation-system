import React from 'react';

function Buttons({ onClick }) {
  return (
    <div>
      <button 
        onClick={onClick}
        className="bg-blue-400 text-white text-sm px-5 py-1 rounded hover:opacity-80 transition">
          View
      </button>
    </div>
  );
}

export default Buttons;
