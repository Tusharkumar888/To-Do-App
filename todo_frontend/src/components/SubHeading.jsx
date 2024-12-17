import { Link } from "react-router-dom"

export const SubHeading = ({label,inputText,to}) =>{

        return <>
        <div className="text-sm text-gray-700 leading-snug  pt-2 "> 
            {label} <Link className="cursor-pointer underline text-cyan-500 hover:text-cyan-600"  to= {to}>{inputText}</Link>
        </div>
        
        </>
}