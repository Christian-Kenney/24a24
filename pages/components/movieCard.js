import React from 'react';
import { Card, Grid, Text } from '@nextui-org/react';
import Link from 'next/link';
import imdbPhoto from '../../styles/imdbphoto.jpg';
import Container from 'react-bootstrap/Container';

export default function MovieCard({ movie }) {
    

  let imageUrl = "";
  let imageAlt = "";
  if( !movie.id) {
    return <div></div>;
  }else{
    if (movie.primaryImage == undefined){
      imageUrl = {imdbPhoto};
      imageAlt = "imdbPhoto"
    } else{
      imageUrl = movie.primaryImage.url;
      // imageAlt = movie.primaryimage.caption.plainText;
    }
  }
  const link = "https://www.imdb.com/title/" + movie.id

  console.log("card movie: ", movie);
  return (
    <>
    <Card css={{ p: "$6", mw: "400px" }} className='movieListCard'>
      <Card.Header>
        <img
          alt= {imageAlt}
          src={imageUrl}
          width="110px"
          height="150px"
          className='cardImg'
        />
        
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs"  }}>
              {movie.originalTitleText.text}
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
          href={link}
        >
          IMDB Page
        </Link>
      </Card.Footer>
    </Card>
    </>
  );
}