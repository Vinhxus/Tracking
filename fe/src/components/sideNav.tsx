import { useState } from "react"
import { Trophy} from 'lucide-react'
import { useNavigate } from "react-router-dom";

export default function SideNav(){
    const [active, setActive] = useState< 'Summary' | 'Activities'>('Summary');
    const navigate = useNavigate();
    return(
        <nav className="flex flex-col gap-2 w-40 border rounded-l-2xl h-screen py-2">
            <div className="flex items-center gap-2 mt-2">
                <Trophy className="ml-2 " size={19} color="yellow" />
                <span 
                    className="bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-2xl text-transparent font-extrabold tracking-tight cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    Tracking
                </span>
            </div>
            <button
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[1.5rem] font-bold transition-colors ${
                active === 'Summary'
                  ? "bg-[#161C27] text-[#E5E9F0]"
                  : "text-[#6B7684] hover:bg-[#12161F] hover:text-[#9AA3B2]"
              }`}
              onClick= { () => setActive('Summary')}
            >
                Summary
            </button>
            <button
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[1.5rem] font-bold transition-colors ${
                active === 'Activities'
                  ? "bg-[#161C27] text-[#E5E9F0]"
                  : "text-[#6B7684] hover:bg-[#12161F] hover:text-[#9AA3B2]"
              }`}
              onClick= {() => setActive('Activities')}
            >
                Activities
            </button>
        </nav>
    )
}