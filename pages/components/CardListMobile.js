import React from 'react';

import MovieCardMobile from './MovieCardMobileComp.js';

export default function CardListMobile({ movies }) {
  console.log("CARDLIST:", movies);
  if (!movies) {
    return null; 
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      {movies.map((movie) => (
        
        <MovieCardMobile key={movie.id} movie={movie} />
        
      ))}
    </div>
  );
}