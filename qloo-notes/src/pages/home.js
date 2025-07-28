import React, { useState, useEffect } from 'react';
import { Card } from '../components/card.js';
import { cardData } from '../resources/card_details.js';

export default function Home() {
  const [name, setName] = useState('Hello User');

  useEffect(() => {
    setName('Hello TGK,');
  }, []);

  return (
    <div className='bodyPart'>
      <div className='userName'>
        <h1>{name}</h1>
      </div>
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
