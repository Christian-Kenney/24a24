import { useState, useEffect, Item } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Script from 'next/script';
import { apiCall } from '../scripts/Main';
import {sortByYearAscending} from '../scripts/Main';
import {generateRandomMovie} from '../scripts/Main';
import {generateList} from '../scripts/Main';
import { generateListData } from '../scripts/Main';
import { Card, Grid, Text } from '@nextui-org/react';
import Layout from './components/LayoutComp';
import CardList from './components/CardList';
import CardListMobile from './components/CardListMobile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default function Home() {
  const [movie1, setMovie1] = useState(null);
  const [movie2, setMovie2] = useState(null);
  const [movie3, setMovie3] = useState(null);
  const [movie4, setMovie4] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  const [movieList, setMovieList] = useState(null);
  const [showMovieList, setShowMovieList] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const link = "https://www.imdb.com/title/";


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    handleResize(); // Check initial screen size
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
    };
  }, []);

  useEffect(() => {
    
    const fetchData = async () => {
      const sortedMovies = sortByYearAscending();
      // const movieListData = generateListData(); tt2044729
      // setMovieList(movieListData);
      try {
        const movie1Data = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt6710474');
        const movie2Data = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt2101441');
        const movie3Data = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt5727208');
        const movie4Data = await apiCall('https://moviesdatabase.p.rapidapi.com/titles/tt2044729');
        // console.log('DM1: ', movie1Data);
        setMovie1(movie1Data);
        setMovie2(movie2Data);
        setMovie3(movie3Data);
        setMovie4(movie4Data);
        // const randomMovieData = await randomMovieData();
        const movieListData = await generateListData();
        setMovieList(movieListData);

        console.log("RM: ", randomMovie);
       


        // console.log("movie1: ", movie1);
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
    console.log('M1:', movie1);
    
  }, [movie1]);

  
  return (
    
    
      <div className={styles.container} id="mainDiv">

        <Head>
          <title>24A24Films </title>
          <link rel="icon" href="/favicon.ico" />
        </Head> 
        {/* <header>
            <div id="headerDiv">
              <h1 id='mainH1'>24 A24 Films</h1>
              <h2 id="mainH2">A Modern Day Film Challenge </h2>
            </div>
        </header> */}
        
        {isSmallScreen ? (
          <div>
            <Container className='a24-container'>
            <Row id="headerRow">
                <Col>
                <h1 id='mainH1'>24 A24 Films</h1>
                <h2 id="mainH2">A Modern Day Film Challenge </h2>
                </Col>
              </Row>
              <hr/>
              <Row className='a24-row'>
                <h2>What is A24?</h2>
              </Row>  
              <Row className='a24-row'>
              <Col><p className='a24-p'>
              A24 is an American independent entertainment company that specializes in film and television production. The name comes from the A24 motorway in Italy, which Daniel Katz was driving on when he decided to start the company. The company's first theatrical release was 'A Glimpse Inside the Mind of Charles.
              </p></Col>
              </Row>  
              <Row className='a24-row'>
              <Col>{movie4 && ( <div class="column">
                  <Card css={{ p: "$6", mw: "400px", backgroundColor: "#CBC8C8" }}>
                    <Card.Header>
                      <img
                        alt="nextui logo"
                        src= {movie4.results.primaryImage.url}
                        width="10px"
                        height="140px"
                      />
                      <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                          <Text h4 css={{ lineHeight: "$xs" }}>
                            
                            {movie4.results.originalTitleText.text}
                          
                          </Text>
                        </Grid>
                        
                      </Grid.Container>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                      <Text>A graphic designer's enviable life slides into despair when his girlfriend breaks up with him.</Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link
                        icon
                        color="primary"
                        target="_blank"
                        href= {link + movie4.results.id} 
                        // href=""
                      >
                        IMDB
                      </Link>
                    </Card.Footer>
                  </Card>
              </div> )}</Col>
              </Row>
              <Row className='a24-row'>
                <Col>
                  <p className='a24-p'>
                  The company has developed a reputation as a powerhouse in independent films. A24 is known for pushing boundaries in every genre of film. The company really started to see growth when it released 'Spring Breakers'.
                  </p>
                </Col>
              </Row>
              <Row className='a24-row'>
              <Col>
                {movie2 && ( <div class="column">
              <Card css={{ p: "$6", mw: "400px", backgroundColor: "#CBC8C8", float:'right' }}>
                  <Card.Header>
                    <img
                      alt="nextui logo"
                      src={movie2.results.primaryImage.url}
                      // src=""
                      width="10px"
                        height="140px"
                    />
                    <Grid.Container css={{ pl: "$6" }}>
                      <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                          {movie2.results.originalTitleText.text}
                          {/* hello */}
                        </Text>
                      </Grid>
                      
                    </Grid.Container>
                  </Card.Header>
                  <Card.Body css={{ py: "$2" }}>
                    <Text>Four college girls hold up a restaurant in order to fund their spring break vacation. While partying, drinking, and taking drugs, they are arrested, only to be bailed out by a drug and arms dealer.</Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link
                      icon
                      color="primary"
                      target="_blank"
                      href={link + movie2.results.id} 
                      // href=""
                    >
                      IMDB
                    </Link>
                  </Card.Footer>
                </Card>
              </div> )}
                </Col>
              </Row>
              <Row className='a24-row'>
                <Col><p className='a24-p'>
                The studio has had success during award season as well. As of 2023, A24 has taken home a total of 15 Oscars. Most recently, their movie 'Everything Everywhere All At Once' won 5 out of the 6 categories it was nominated for, becoming the first movie to win in five 'above-the-line' categories.
                </p></Col>
              </Row>
              <Row className='a24-row'>
              <Col>{movie1 && ( <div class="column">
                  <Card css={{ p: "$6", mw: "400px", backgroundColor: "#CBC8C8" }}>
                    <Card.Header>
                      <img
                        alt="nextui logo"
                        src= {movie1.results.primaryImage.url}
                        width="10px"
                        height="140px"
                      />
                      <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                          <Text h4 css={{ lineHeight: "$xs" }}>
                            
                            {movie1.results.originalTitleText.text}
                          
                          </Text>
                        </Grid>
                        
                      </Grid.Container>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                      <Text>A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.</Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link
                        icon
                        color="primary"
                        target="_blank"
                        href= {link + movie1.results.id} 
                      >
                        IMDB
                      </Link>
                    </Card.Footer>
                  </Card>
              </div> )}</Col>
              </Row>
              <Row className='a24-row'>
              <Col>
                <h1>The Challenge!</h1>
                <p className='a24-p2'>
                  The best way to learn about A24 is to experience the amazing movies they have produced. Therefore, I created the '24 A24' movie challenge. 
                </p>
                <p className='a24-p'>
                  I have created the app to generate a unique list of movies for each viewer. Your 24 A24 experience wont be the same as the next person. The application will generate a list of 24 movies that will fulfill the rules and make for a unique viewing experience.
                </p>
                </Col>
              </Row>
              <Row className='a24-row'>
              <Col className='a24-rules'>
                <ul className='a24-ul'>

                  <h2 className='rulesH2'>The Rules:</h2>
                  <li className='a24-li'>
                    - One movie from each year since they started.
                  </li>
                  <li className='a24-li'>
                    - One movie that was nominated for an Oscar.
                  </li>
                  <li className='a24-li'>
                    - One horror movie.
                  </li>
                  <li className='a24-li'>
                    - One coming to age story.
                  </li>
                  <li className='a24-li'>
                    - One more from the top 10 of ratings according to Rotten Tomatoes
                  </li>
                  <li className='a24-li'>
                    - One more from the bottom 10 of ratings according to Rotten Tomatoes
                  </li>
                </ul>

                </Col>
              </Row>
              <Row className='a24-row'>

              {!showMovieList && <button onClick={handleButtonClick} class="a24-button draw-border">Generate Movie List!</button>}
              {movieList && showMovieList && <CardListMobile movies={movieList} className="mobileML"/>}
              </Row>
            </Container>
          </div>
        ) : (
          <div>

            <Container className='a24-container'>
              <Row id="headerRow">
                <Col>
                <h1 id='mainH1'>24 A24 Films</h1>
                <h2 id="mainH2">A Modern Day Film Challenge </h2>
                </Col>
              </Row>
              <hr/>
              <Row className='a24-row'>
                <h2>What is A24?</h2>
              </Row>
              <Row className='a24-row'>
                <Col>{movie4 && ( <div class="column">
                  <Card css={{ p: "$6", mw: "400px", backgroundColor: "#CBC8C8" }}>
                    <Card.Header>
                      <img
                        alt="nextui logo"
                        src= {movie4.results.primaryImage.url}
                        width="20px"
                        height="270px"
                      />
                      <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                          <Text h4 css={{ lineHeight: "$xs" }}>
                            
                            {movie4.results.originalTitleText.text}
                          
                          </Text>
                        </Grid>
                        
                      </Grid.Container>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                      <Text>A graphic designer's enviable life slides into despair when his girlfriend breaks up with him.</Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link
                        icon
                        color="primary"
                        target="_blank"
                        href= {link + movie4.results.id} 
                        // href=""
                      >
                        IMDB
                      </Link>
                    </Card.Footer>
                  </Card>
              </div> )}</Col>
                <Col><p className='a24-p'>
                A24 is an American independent entertainment company that specializes in film and television production. The name comes from the A24 motorway in Italy, which Daniel Katz was driving on when he decided to start the company. The company's first theatrical release was 'A Glimpse Inside the Mind of Charles.                </p></Col>
              </Row>
              <Row className='a24-row'>
                <Col>
                  <p className='a24-p'>
                  The company has developed a reputation as a powerhouse in independent films. A24 is known for pushing boundaries in every genre of film. The company really started to see growth when it released 'Spring Breakers'.
                  </p>
                </Col>
                <Col>
                {movie2 && ( <div class="column">
              <Card css={{ p: "$6", mw: "400px", backgroundColor: "#CBC8C8", float:'right' }}>
                  <Card.Header>
                    <img
                      alt="nextui logo"
                      src={movie2.results.primaryImage.url}
                      // src=""
                      width="20px"
                      height="270px"
                    />
                    <Grid.Container css={{ pl: "$6" }}>
                      <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                          {movie2.results.originalTitleText.text}
                          {/* hello */}
                        </Text>
                      </Grid>
                      
                    </Grid.Container>
                  </Card.Header>
                  <Card.Body css={{ py: "$2" }}>
                    <Text>Four college girls hold up a restaurant in order to fund their spring break vacation. While partying, drinking, and taking drugs, they are arrested, only to be bailed out by a drug and arms dealer.</Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link
                      icon
                      color="primary"
                      target="_blank"
                      href={link + movie2.results.id} 
                      // href=""
                    >
                      IMDB
                    </Link>
                  </Card.Footer>
                </Card>
              </div> )}
                </Col>
              </Row>
              <Row className='a24-row'>
                <Col>{movie1 && ( <div class="column">
                  <Card css={{ p: "$6", mw: "400px", backgroundColor: "#CBC8C8" }}>
                    <Card.Header>
                      <img
                        alt="nextui logo"
                        src= {movie1.results.primaryImage.url}
                        width="20px"
                        height="270px"
                      />
                      <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                          <Text h4 css={{ lineHeight: "$xs" }}>
                            
                            {movie1.results.originalTitleText.text}
                          
                          </Text>
                        </Grid>
                        
                      </Grid.Container>
                    </Card.Header>
                    <Card.Body css={{ py: "$2" }}>
                      <Text>A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.</Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link
                        icon
                        color="primary"
                        target="_blank"
                        href= {link + movie1.results.id} 
                      >
                        IMDB
                      </Link>
                    </Card.Footer>
                  </Card>
              </div> )}</Col>
                <Col><p className='a24-p'>
                The studio has had success during award season as well. As of 2023, A24 has taken home a total of 15 Oscars. Most recently, their movie 'Everything Everywhere All At Once' won 5 out of the 6 categories it was nominated for, becoming the first movie to win in five 'above-the-line' categories.
                </p></Col>
              </Row>
              <Row className='a24-row'>
              
              </Row>
              <Row className='a24-row'>
              
              </Row>
              <Row className='a24-row'>
                <Col>

                <h1>The Challenge!</h1>
                <p className='a24-p2'>
                  The best way to learn about A24 is to experience the amazing movies they have produced. Therefore, I created the '24 A24' movie challenge. 
                </p>

                
                <p className='a24-p'>
                  I have created the app to generate a unique list of movies for each viewer. Your 24 A24 experience wont be the same as the next person. The application will generate a list of 24 movies that will fulfill the rules and make for a unique viewing experience.
                </p>
                
                </Col>
                <Col className='a24-rules'>
                <ul className='a24-ul'>

                  <h2 className='rulesH2'>The Rules:</h2>
                  <li className='a24-li'>
                    - One movie from each year since they started.
                  </li>
                  <li className='a24-li'>
                    - One movie that was nominated for an Oscar.
                  </li>
                  <li className='a24-li'>
                    - One horror movie.
                  </li>
                  <li className='a24-li'>
                    - One coming to age story.
                  </li>
                  <li className='a24-li'>
                    - One more from the top 10 of ratings according to Rotten Tomatoes
                  </li>
                  <li className='a24-li'>
                    - One more from the bottom 10 of ratings according to Rotten Tomatoes
                  </li>
                </ul>

                </Col>

              </Row>
              <Row className='a24-row'>

              {!showMovieList && <button onClick={handleButtonClick} class="a24-button draw-border">Generate Movie List!</button>}
              {movieList && showMovieList && <CardList movies={movieList} />}
              </Row>
            </Container>
          <Layout>
          
              
            {/* <div class="row" id="historyBox" >
              {movie4 && (
              <div className="column" id="history1pic">
                <Card css={{ p: "$6", mw: "400px", backgroundColor: "#CBC8C8" }}>
                  <Card.Header>
                    <img
                      alt="nextui logo"
                      src={movie4.results.primaryImage.url}
                      width="20px"
                      height="270px"
                    />
                    <Grid.Container css={{ pl: "$6" }}>
                      <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                          {movie4.results.originalTitleText.text}
                        </Text>
                      </Grid>
                      
                    </Grid.Container>
                  </Card.Header>
                  <Card.Body css={{ py: "$2" }}>
                    <Text>A graphic designer's enviable life slides into despair when his girlfriend breaks up with him.</Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link
                      icon
                      color="primary"
                      target="_blank"
                      href={link + movie4.results.id} 
                    >
                      IMDB
                    </Link>
                  </Card.Footer>
                </Card>
              </div>
            )}
              <div class="column" id="history1">
                <p>
                    A24 is an American independent entertainment company that specializes in film and television production. The name comes from the A24 motorway in Italy that found Daniel Katz was driving on when he decided to start the company. The first theatrical release was A Glimpse Inside the Mind of Charles.
                </p>
              </div>
              
            </div>
            <div class="column2" id="historyBox" >
              
            {movie2 && (
              <div className="" id="history2pic">
                <Card css={{ p: "$6", mw: "400px", backgroundColor: "#CBC8C8" }}>
                  <Card.Header>
                    <img
                      alt="nextui logo"
                      src={movie2.results.primaryImage.url}
                      width="20px"
                      height="270px"
                    />
                    <Grid.Container css={{ pl: "$6" }}>
                      <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                          {movie2.results.originalTitleText.text}
                        </Text>
                      </Grid>
                      
                    </Grid.Container>
                  </Card.Header>
                  <Card.Body css={{ py: "$2" }}>
                    <Text>A graphic designer's enviable life slides into despair when his girlfriend breaks up with him.</Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link
                      icon
                      color="primary"
                      target="_blank"
                      href={link + movie2.results.id} 
                    >
                      IMDB
                    </Link>
                  </Card.Footer>
                </Card>
              </div>
            )}  
              <div class="row" id="history2">
                <p>
                  The company has developed a reputation as a powerhouse in independent films. A24 is known for pushing the boundary in every genre of film. The company really started to see growth when it released Spring Breakers.
                </p>
              </div>
            
              <div class="row">
                <div class="column"></div>
              </div>
            </div>  */}
        
        </Layout>
          </div>
        )}
        
        
        
    
          {/* <body> */}
            
            {/* <div>
            <h1>Test</h1>
            </div> */}
          {/* <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            >
              <Item>
                test1
              </Item>
            </Grid> */}
          {/* <div class="wrapper">
            <div class="column">
              <h2>Column 1</h2>
              <p>Some text..</p>
            </div>
            <div class="column">
              <h2>Column 1</h2>
              <p>Some text..</p>
            </div>
            
          </div> */}
            {/* <button onClick={handleButtonClick}>Generate Movie List</button>
            {movieList && showMovieList && <CardList movies={movieList} />} */}

          {/* <div id="randomMovie">
          <Card css={{ p: "$6", mw: "400px" }}>
            <Card.Header>
              <img
                alt= ""
                src=""
                width="110px"
                height="110px"
              />
              <Grid.Container css={{ pl: "$6" }}>
                <Grid xs={12}>
                  <Text h2 css={{ lineHeight: "$xs"  }}>
                    ""
                  </Text>
                </Grid>
                <Grid xs={12}>
                  <Text css={{ color: "$accents8" }}></Text>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Footer>
              <Link
                icon
                color="primary"
                target="_blank"
                href=""
              >
                IMDB Page
              </Link>
            </Card.Footer>
          </Card>

          </div> */}
          
          {/* </body> */}

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
              font-family: MADE Sunflower, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }
            * {
              box-sizing: border-box;
            }
          `}</style>
          {/* </Layout> */}
        </div>
    
  )
}