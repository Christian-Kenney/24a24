import axios from 'axios';
import movies from '../scripts/movies';


  let baseUrl = 'https://moviesdatabase.p.rapidapi.com/titles/';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cc94d36f58msh9ec219d4237b467p18c4ddjsne10f711f1714',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  async function generateRandomMovie() {
    let randomIndex = Math.floor(Math.random() * movies.length);
    let randomObject = movies[randomIndex];
    let url = baseUrl + randomObject.ending;
    let randomMovie = await apiCall(url);
    // console.log("RANDOM: ", randomMovie);
    let movieList = generateList();
    return randomMovie;

  }

  async function apiCall(url){
    try {
      const response = await axios.get(url, options);
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }

  }

  async function generateList() {
    let movieListRaw = [];
    let movieList = [];
    for(let i = 2013; i <= 2023; i++){
      movieListRaw.push(findRandomMovieByYear(movies, i));
    }
    movieListRaw.push(getOscarMovie(movies, movieListRaw));
    movieListRaw.push(getHorrorMovie(movies, movieListRaw));
    movieListRaw.push(getTopMovie(movies, movieListRaw));
    movieListRaw.push(getBottomMovie(movies, movieListRaw));
    for(let i = 15; i <= 23; i++){
      movieListRaw.push(fillList(movies, movieListRaw));
    }
    // console.log("MOVIELISTRAW: ", movieListRaw);
    
    const apiCalls = movieListRaw.map(movie => apiCall(baseUrl + movie.ending));
    const movieResponses = await Promise.all(apiCalls);
    movieList = movieResponses.map(response => response.results);
    
    // console.log("MOVIELIST: ", movieList);
    return movieList;
  }

  async function generateListData() {
    try {
      const list = await generateList();
      // console.log("List:", list);
      return list;
      // Perform any other actions with the list
    } catch (error) {
      console.error(error);
    }
    
  }
  
  function findRandomMovieByYear(movies, year) {
    
    const filteredMovies = movies.filter(movie => movie.year === year);
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const randomMovie = filteredMovies[randomIndex];

    return randomMovie;
  }

  function getOscarMovie(movies, movieList){
    
    
    const filteredMovies = movies.filter(movie => movie.oscar && !movieList.includes(movie));
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const randomMovie = filteredMovies[randomIndex];

    return randomMovie;
  }

  function getHorrorMovie(movies, movieList){
    const filteredMovies = movies.filter(movie => movie.horror && !movieList.includes(movie));
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const randomMovie = filteredMovies[randomIndex];

    return randomMovie;
  }

  function getTopMovie(movies, movieList){
    const filteredMovies = movies.filter(movie => movie.top && !movieList.includes(movie));
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const randomMovie = filteredMovies[randomIndex];

    return randomMovie;
  }

  function getBottomMovie(movies, movieList){
    const filteredMovies = movies.filter(movie => movie.bottom && !movieList.includes(movie));
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const randomMovie = filteredMovies[randomIndex];

    return randomMovie;
  }

  function fillList(movies, movieList){
    const filteredMovies = movies.filter(movie => !movieList.includes(movie));
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const randomMovie = filteredMovies[randomIndex];

    return randomMovie;
  }

  function sortByYearAscending() {
    movies.sort((a, b) => a.year - b.year);
    return movies;
  }
  
  function sortByYearDescending() {
    movies.sort((a, b) => b.year - a.year);
  }
  export { movies, sortByYearAscending, sortByYearDescending, generateRandomMovie, generateList, apiCall, generateListData };