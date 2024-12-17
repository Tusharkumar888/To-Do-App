

export const ButtonComponent = ({onClick,value}) =>{
    return <div className="md:w-[20%] w-[40%]">
        <button onClick={onClick} className=" my-4 mx-auto w-full h-12 bg-purple-500 border-2 rounded-3xl text-white hover:bg-purple-600">{value}</button>
    </div>
}