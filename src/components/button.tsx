import "./../index.css";

interface Prop{
    color: string;
    height: string;
    width?: string;
    content: string;
}


export function Button({color, height, width="100px", content}: Prop)
{
    return (
        <button className={`bg-emerald-600 h-[${height}] w-[${width}] text-${color}`}>
            {content}
        </button>
    )
}