import React, { useState } from "react";

export const RadioInput = ({ options, name, onChange, }) => {


  return (
    <div className="flex gap-7 py-4">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option}
            onChange={onChange}
            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};



