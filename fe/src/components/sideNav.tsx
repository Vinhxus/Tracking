import { useEffect, useState } from "react"
import { Trophy, User} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import api from "../lib/axios.js";

export default function SideNav(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        async function fetchName() {
            try {
                const res = await api.get("/auth/me");
                setUserName(res.data.user.name);
            } catch (err) {
                console.error("Failed to fetch user name", err);
            }
        }
        fetchName();
    }, []);
    
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

            <div className="flex items-center gap-2 mt-2 justify-center">
                <User/>
                <span>{userName}</span>
            </div>
        </nav>
    )
}