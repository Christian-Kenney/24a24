import React from 'react';

import MovieCard from './MovieCardComp.js';

export default function CardList({ movies }) {
  console.log("CARDLIST:", movies);
  if (!movies) {
    return null; // or any fallback UI or loading state if desired
  }
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      {movies.map((movie) => (
        
        <MovieCard key={movie.id} movie={movie} />
        
      ))}
    </div>
  );
}