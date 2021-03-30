import React from "react"
import styled from "styled-components"
import Img, { FluidObject } from "gatsby-image"
import { useTransition, animated as a } from "react-spring"
import { Link } from "gatsby"
import Viewer from "./common/viewer"

type CarouselProps = {
  images: [any]
}

const Container = styled.div``

const ImageContainer = styled(a.div)`
  cursor: pointer;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ArrowsContainer = styled.div`
  display: flex;
  font-size: 24px;
  justify-content: flex-start;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none;
  .Arrows {
    width: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .Carousel__show-all {
    font-size: 16px;
  }
`

const Image = styled(Img)`
  height: 600px;
`

const Carousel = (props: CarouselProps) => {
  const { images } = props
  const [current, setCurrent] = React.useState(0)
  const [isReversing, setIsReversing] = React.useState(false)
  const [shouldShowViewer, setShouldShowViewer] = React.useState(false)

  const handleClick = (direction: string) => {
    if (direction === "up") {
      const newCurrent = current === images.length - 1 ? 0 : current + 1
      setCurrent(newCurrent)
      setIsReversing(false)
    } else if (direction === "down") {
      const newCurrent = current === 0 ? images.length - 1 : current - 1
      setCurrent(newCurrent)
      setIsReversing(true)
    }
  }

  const handleViewerToggle = () => {
    setShouldShowViewer(!shouldShowViewer)
  }

  return (
    <Container>
      <ImageContainer onClick={handleViewerToggle}>
        <Image
          fluid={images[current].childImageSharp.fluid}
          imgStyle={{ objectFit: "contain" }}
        />
      </ImageContainer>
      <ArrowsContainer>
        {images.length > 1 && (
          <div className="Arrows">
            <div
              className="Carousel__arrow"
              onClick={() => handleClick("down")}
            >
              {"<"}
            </div>
            <div className="Carousel__arrow" onClick={() => handleClick("up")}>
              {">"}
            </div>
          </div>
        )}
      </ArrowsContainer>
      {shouldShowViewer && (
        <Viewer image={images[current]} onClick={handleViewerToggle} />
      )}
    </Container>
  )
}

type AllPhotosProps = {
  images: [any]
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
  justify-content: space-between;
  @media only screen and (max-width: ${props => props.theme.mobileSize}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1rem;
  }
  .ImageHolder {
    max-height: 300px;
    width: 300px;
    overflow: hidden;
    @media only screen and (max-width: ${props => props.theme.mobileSize}) {
      width: 200px;
    }
  }
`

const AllPhotos = (props: AllPhotosProps) => {
  return (
    <Grid>
      {props.images.map(i => (
        <div className="ImageHolder">
          <Img fluid={i.childImageSharp.fluid} />
        </div>
      ))}
    </Grid>
  )
}

export default Carousel
