import { Calendar } from "lucide-react";
import { startOfWeek, addDays, format, isFuture } from "date-fns";
import SideNav from "../components/sideNav";
import { useNavigate } from "react-router-dom";
import PillarsGrid from "../components/5col";
import {getUserIdFromToken} from "../lib/auth";

export default function HomePage() {
    const navigate = useNavigate();
    const userId = getUserIdFromToken();

    // truyền { weekStartsOn: 1 } => Thứ 2 là ngày đầu
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });

    // Tạo mảng 7 ngày trong tuần
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = addDays(startDate, i);
        return {
            date,
            dayName: format(date, "EEE"),   // Mon, Tue, Wed...
            dayNumber: format(date, "d"),   
            fullDate: format(date, "yyyy-MM-dd"), // dùng làm param cho route
        };
    });

    return (
        <div data-theme="dim" className="w-screen flex h-max overflow-hidden">
            <SideNav />
            <div className="flex flex-col overflow-hidden flex-1 ">   
                {userId && <PillarsGrid userId={userId} />}
            
                <div className="border ml-25 mt-5 w-300 h-80 rounded px-2 py-1 flex flex-col items-center gap-2">
                    <Calendar size={20} className="mt-3"/>
                    <span className="text-2xl"> Access daily tracking</span>
                    <div className="flex gap-2 ml-3 mt-3" >
                    {weekDays.map((day) => (
                        <button
                            key={day.fullDate}
                            className={`border w-20 h-30 rounded px-3 py-2 flex flex-col items-center justify-center 
                                cursor-pointer disabled:cursor-not-allowed 
                                ${ !isFuture(day.date)
                                    ? "bg-[#0d1424] text-white"
                                    : "bg-[#161C27] text-[#6B7684] hover:bg-[#12161F] hover:text-[#9AA3B2]"
                                }`
                            }
                            disabled = {isFuture(day.date)}
                            onClick={() => navigate(`/activities/${day.fullDate}`)}             
                        >
                            <span className="text-2xl">{day.dayName}</span>
                            <span className="text-3xl font-semibold">{day.dayNumber}</span>
                        </button>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}