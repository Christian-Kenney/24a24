import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Script from 'next/script';
import mainJs, { apiCall } from '../pages/scripts/main';
import {sortByYearAscending} from '../pages/scripts/main';
import {generateRandomMovie} from '../pages/scripts/main';
import {generateList} from '../pages/scripts/main';
import { Card, Grid, Text } from '@nextui-org/react';

export default function Home() {
  const [movie1, setMovie1] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const sortedMovies = sortByYearAscending();
      const movieList = generateList();
      const randomMovie = generateRandomMovie();

      try {
        const movie1Data = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt6710474');
        console.log("11111", movie1Data);
        setMovie1(movie1Data);

        const movie2 = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt4975722');
        const movie3 = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt5727208');

        console.log("RANDOM", randomMovie);
        console.log(movie1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>24A24Films</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 


      <main>

        <h1>24 A24 Films</h1>
        <h1>Hello, {movie1.results.id}</h1>
      <Card css={{ p: "$6", mw: "400px" }}>
      <Card.Header>
        <img
          alt="nextui logo"
          src= {movie1.results.primaryImage.url}
          width="34px"
          height="34px"
        />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              Next UI
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>nextui.org</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
          Make beautiful websites regardless of your design experience.
        </Text>
      </Card.Body>
      <Card.Footer>
        <Link
          icon
          color="primary"
          target="_blank"
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </Card.Footer>
    </Card>
        <h1 className={styles.title}>
          Read <Link href='/posts/first-post'>this page!</Link>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
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
    </div>
  )
}