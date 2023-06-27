import React from 'react';

import MovieCard from '../components/MovieCard.js';

export default function CardList({ movies }) {
  console.log("CARDLIST:", movies);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      {movies.map((movie) => (
        
        <MovieCard key={movie.id} movie={movie} />
        
      ))}
    </div>
  );
}