import Part from "./part";
import { Dumbbell, BrainCog, Sun, Users, PiggyBank } from "lucide-react";

export default function PillarsGrid() {
  return (
    <div className="flex gap-4 bg-[#070b14] p-6">
      <Part
        icon={<Dumbbell size={14} />}
        title="Health"
        theme="emerald"
        percent={80}
      />
 
      <Part
        icon={<BrainCog size={14} />}
        title="Study"
        theme="blue"
        percent={65}
      />
 
      <Part
        icon={<Sun size={14} />}
        title="Spirit"
        theme="purple"
        percent={55}
      />
 
      <Part
        icon={<Users size={14} />}
        title="Social"
        theme="orange"
        percent={38}
      />

      <Part
        icon={<PiggyBank size={14}/>}
        title="Money"
        theme="pink"
        percent={38}
      />
    </div>
  );
}
 