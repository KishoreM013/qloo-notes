import { Link } from "react-router-dom";
import { BiMenu, BiHistory, BiLogOut, BiUser } from "react-icons/bi";
import './sidebar.css';
import { MdSettings } from "react-icons/md";

export function Sidebar() {
  let iconSize = 35;
  let color='black';
  return (
    <div className="sidebar">
      <div className="top-part">
        <Link to="/home">
          <BiMenu size={iconSize} color={color}/>
        </Link>
        <Link to="/history">
          <BiHistory size={iconSize} color={color}/>
        </Link>
      </div>
      <div className="bottom-part">
        <Link to="/settings">
            <MdSettings size={iconSize} color={color}/></Link>
        <Link to="/about">
            <BiUser size={iconSize} color={color}/>
        </Link>
        <Link to="/logout">
            <BiLogOut size={iconSize} color={color}/>
        </Link>
      </div>
    </div>
  );
}
