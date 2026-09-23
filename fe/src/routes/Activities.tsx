import CreateBar from "../components/createBar";
import { useParams } from "react-router-dom";
import SideNav from "../components/sideNav";
import DailyCol from '../components/dailyCol'
import ActivityList from "../components/ActivityList";
import { getUserIdFromToken } from "../lib/auth";

export default function Activities(){
    const { date } = useParams<{ date: string }>();
    const userId = getUserIdFromToken();
    return(
        <div data-theme="dim" className="w-screen flex h-max overflow-hidden">
            <SideNav />
            <div className="flex flex-col w-full overflow-hidden">
                <CreateBar selectedDate={date}/>
                {userId && <DailyCol userId={userId} />}
                <ActivityList date={date}/>
            </div>
        </div>
    )
}