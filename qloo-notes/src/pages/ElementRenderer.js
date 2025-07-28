import { useParams } from "react-router-dom";
import LearnPage from "./learn_page";

export default function ElementRenderer ({items}){
    let params = useParams();
    const id = params.id;
    const filteredItem = items.find(i=> i.id==id);
    return <LearnPage props={filteredItem}/>
}