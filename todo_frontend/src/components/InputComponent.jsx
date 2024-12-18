export const InputComponent = ({onChange,inputs}) =>{
    return <div className="pt-5 relative w-[70%]">
    <label htmlFor="userInput" className="text-sm relative  ">{inputs}</label><br />
    <input onChange={onChange} type="text" id="userInput" placeholder= ""  className="border-2 border-gray-400 rounded-lg ... relative w-[100%] h-10 shadow-inner"/>
    </div>
}

