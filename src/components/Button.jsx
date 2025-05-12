import React from 'react';

function Button ({name, onClick}){
    return(
      <div>
        <button
        onClick={onClick}
        className=" bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
        {name}
      </button>   
      </div>   
    )
}
export default Button;