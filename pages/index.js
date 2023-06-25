import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Script from 'next/script';
import mainJs, { apiCall } from '../pages/scripts/main';
import {sortByYearAscending} from '../pages/scripts/main';
import {generateRandomMovie} from '../pages/scripts/main';
import {generateList} from '../pages/scripts/main';
import { generateListData } from '../pages/scripts/main';
import { Card, Grid, Text } from '@nextui-org/react';
import Layout from '../pages/components/layout';
import CardList from './components/CardList';


export default function Home() {
  const [movie1, setMovie1] = useState(null);
  const [movie2, setMovie2] = useState(null);
  const [movie3, setMovie3] = useState(null);
  const [movieList, setMovieList] = useState(null);
  const [showMovieList, setShowMovieList] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const sortedMovies = sortByYearAscending();
      // const movieListData = generateListData();
      const randomMovie = generateRandomMovie();

      // setMovieList(movieListData);
      try {
        const movie1Data = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt6710474');
        const movie2Data = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt4975722');
        const movie3Data = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt5727208');
        // console.log('DM1: ', movie1Data);
        setMovie1(movie1Data);
        setMovie2(movie2Data);
        setMovie3(movie3Data);
        const movieListData = await generateListData();
      setMovieList(movieListData);

        
      } catch (error) {
        console.error(error);
      }

    };

    fetchData();
  
  }, []);

  const handleButtonClick = async () => {
    try {
      
      setShowMovieList(true);
      console.log("ML: ", movieList);
    } catch (error) {
      console.error(error);
    }
  };

  const checkData = () => {
    console.log(movieList);
  }

  useEffect(() => {
    // console.log('M1:', movie1);
    
  }, [movie1]);

  return (
    
      <div className={styles.container}>
        <Head>
          <title>24A24Films </title>
          <link rel="icon" href="/favicon.ico" />
        </Head> 

        <Layout>
          <main>
            

            <h1 id='mainH1'>24 A24 Films</h1>
            <h4>Modern Day Film Challenge </h4>

            <button onClick={handleButtonClick}>Generate Movie List</button>
            <button onClick={checkData}>Check Data</button>
            {movieList && showMovieList && <CardList movies={movieList} />}
            
            
          </main>

          <footer>
            
          </footer>

          <style jsx>{`
            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            footer img {
              margin-left: 0.5rem;
            }
            footer a {
              display: flex;
              justify-content: center;
              align-items: center;
              text-decoration: none;
              color: inherit;
            }
            code {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
            }
          `}</style>

          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }
            * {
              box-sizing: border-box;
            }
          `}</style>
          </Layout>
        </div>
    
  )
}