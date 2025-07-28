import { ScratchPad } from "../components/scratchpad";

export default function LearnPage({props}){
    console.log(props)
    return <div className="learn-page">
        <h1>{props.title}</h1>
        <h3>{props.content}</h3>
        <ScratchPad/>
    </div>;
}