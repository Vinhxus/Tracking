interface PartProps {
    name : string;
    percent?: string;
}

export default function Part(){
    {/* Progress bar */}
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
            className="h-full rounded-full bg-linear-to-r from-emerald-400 to-teal-200 transition-all duration-500"
            style={{ width: `${percent}%` }}
        />
    </div>
}