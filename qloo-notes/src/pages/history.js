import React from 'react';
import { Card } from '../components/card.js';
import { cardData } from '../resources/card_details.js';

export default function History() {
  return (
    <div className="history-page">
      <h1>Your History</h1>
      <p>Here are the items you've interacted with.</p>
      
      <div className='card-list'>
        {cardData.map(item => (
          <Card
            key={item.id} 
            title={item.title}
            content={item.content}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
}
