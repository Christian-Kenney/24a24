import React from 'react';

import movieCard from './movieCard';

export default function CardList({ movies }) {
  console.log("CARDLIST:", movies);
  return (
    <div>
      <h1>hello</h1>
      {movies.map((movie) => (
        
        <movieCard key={movie.id} movie={movie} />
        
      ))}
    </div>
  );
}