import { BiMenu } from 'react-icons/bi';
import './topbar.css';

export function TopBar() {
    return <div className='topbar'>
        <span className='icon'>
          <BiMenu size={50} onClick={()=>{console.log("Button clicked")}} />
        </span>
        <span>
          <h1>QlooNotes</h1>  
        </span> 
    </div>;
}
