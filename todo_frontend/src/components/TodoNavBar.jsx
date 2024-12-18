import { SVGMoonComponent } from "./SVGMoonComponent"
import { SVGSunComponent } from "./SVGSunComponent"
import {useAuth} from "../../public/Authpro"
export const TodoNavBar = ({bgColor, setBgcolor}) =>{
   const { logout } = useAuth();
    return <>
    <div className="text-sm  relative flex leading-snug w-full h-16 justify-between items-center px-6  shadow-xl"> 
        
        <div className="flex gap-8 ">
            <img className="hover:scale-110 transition-all cursor-pointer duration-300" src="https://img.icons8.com/doodle/48/reminders.png" alt="" />
            <img className="hover:scale-110 transition-all cursor-pointer duration-300" src="https://img.icons8.com/plasticine/50/exit.png" alt="" onClick={()=>{
                logout()
            }} />
        </div>
        <div className=" md:text-3xl text-xl text-orange-500 font-PatrickHand ">
            <p >TO-DO-APP</p>
        </div>
        <div className=" cursor-pointer flex gap-6   ">
                <div onClick={()=>{
                    setBgcolor(!bgColor)
                }}>
                    {
                        bgColor==true?<SVGSunComponent></SVGSunComponent>:<SVGMoonComponent></SVGMoonComponent>
                    }
                </div>
                <div className="">
                    <a href="https://github.com/Tusharkumar888/To-Do-App" target="blank">
                    
                    <img  className=" hover:scale-110 transition-all duration-300 cursor-pointer" src="https://img.icons8.com/external-those-icons-flat-those-icons/40/external-GitHub-Logo-social-media-those-icons-flat-those-icons.png" alt="" />
                    </a>
                </div>
                
        </div>
    </div>
    
    </>
}