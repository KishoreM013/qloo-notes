import './App.css';
import { Sidebar } from './components/sidebar.js';
import {useState} from "react";



// import {TopBar} from './components/topbar.js';
function App() {
    const [name, setName] = useState('Kuttie Koonjan');
    const [count, setCount] = useState(0);


    console.log (name);
    return (
        <div className="App">
            <Sidebar/>
            <div className='bodyPart'>
                <div className='userName'>
                   <h1>Count : {count}</h1>
                    <button onClick={()=>{
                        setCount (count + 1);
                        console.log(count);
                    }}>increment</button>
                </div>
            </div>
        </div>
  );
}

export default App;
