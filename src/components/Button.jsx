import React from 'react';

function Button({ name, onClick, kind }) {
  return (
    <div>
      <button
        onClick={onClick}
        className={kind} 
      >
        {name}
      </button>   
    </div>   
  );
}

export default Button;
