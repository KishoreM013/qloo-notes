import { Card } from '../components/card.js';
import { cardData } from '../resources/card_details.js';
import { Link } from 'react-router-dom';
import '../components/utils.js';
import './learn_page.js';

export default function History() {
  return (
    <div className="history-page">
      <h1>Your History</h1>
      <p>Here are the items you've interacted with.</p>
      
      <div className='card-list'>
        {cardData.map(item => (
          <div>
            <Link key={item.id} to={`/elements/${item.id}`} className="card-link">
            <Card
            key={item.id} 
            title={item.title}
            content={item.content}
            date={item.date}
          />
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
