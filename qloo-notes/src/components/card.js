import './card.css';

export function Card({title, content, date}){
    return <div className="card">
        <h1 className="heading-part">{title}</h1>
        <h3 className="content-part">{content}</h3>
        <h6 className="bottom-date">{date}</h6>
    </div>;
}