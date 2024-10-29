import { Link } from "react-router-dom";

export function Bottomwarning({label,link,to}){
    return <div className="text-sm mt-4">
    {label} <Link to={`/${to}`} className="underline cursor-pointer ">{link}</Link>
    </div>
}