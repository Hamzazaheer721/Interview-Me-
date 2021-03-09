import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../../globalStyles';
import {useSelector} from 'react-redux'

import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img
} from './InfoSection.elements';


function InfoSection({
  primary,
  lightBg,
  topLine,
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart,
  start
}) {


  const auth = useSelector(state => state.auth)
  const {user, isLogged} = auth
  
  
  useEffect(() => {

  }, [isLogged, user]);
  
  return (
    

    <>
      <InfoSec lightBg={lightBg}>
        <Container>
          <InfoRow imgStart={imgStart}>
            <InfoColumn>
              <TextWrapper>
                <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                <Link to='/register'>
                  {!isLogged &&(
                    <Button big fontBig primary={primary}>
                      {buttonLabel}
                    </Button>
                  )}
                </Link>
              </TextWrapper>
            </InfoColumn>
            <InfoColumn>
              <ImgWrapper start={start}>
                <Img src={img} alt={alt} />
              </ImgWrapper>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  );
}

export default InfoSection;
