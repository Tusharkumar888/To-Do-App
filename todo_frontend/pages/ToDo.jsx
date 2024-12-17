import React, { useState } from "react";
import { TodoNavBar } from "../src/components/TodoNavBar";
import { FormComponent } from "../src/components/FormComponent";

export const ToDo = () => {
  const [bgColor, setBGcolor] = useState(true);

  return (
    <div
      className={`w-screen h-[100vh] overflow-hidden  ${
        bgColor == true ? " bg-white text-black border-spacing-2 border-orange-500 " : "bg-[#1B1B1B] "
      } `}
    >
      <TodoNavBar bgColor={bgColor} setBgcolor={setBGcolor}></TodoNavBar>
      <FormComponent></FormComponent> 
     
    </div>
  );
};
