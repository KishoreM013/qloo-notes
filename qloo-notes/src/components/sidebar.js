import { BiMenu, BiHistory, BiLogOut, BiUser } from "react-icons/bi";
import './sidebar.css';
import {MdSettings} from "react-icons/md";

export function Sidebar() {
    let iconSize = 35;
    return <div className="sidebar">
        <div className="top-part">
            <BiMenu size={iconSize} />
            <BiHistory size={iconSize} />
        </div>
        <div className="bottom-part">
            <MdSettings size={iconSize} />
            <BiUser size={iconSize} />
            <BiLogOut size={iconSize} />
        </div>

    </div>;
}