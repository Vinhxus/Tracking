import Card from "../components/Card";
import CreateBar from "../components/createBar";
import SideNav from "../components/sideNav";
import PillarsGrid from "../components/5col";

export default function Activities(){
    return(
        <div data-theme="dim" className="w-screen flex h-max overflow-hidden">
            <SideNav />
            <div className="flex flex-col w-full">
                <CreateBar />
                <PillarsGrid />
                <Card />
            </div>
            
        </div>
    )
}