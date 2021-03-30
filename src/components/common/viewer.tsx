import React from "react"
import styled from "styled-components"
import Carousel from "../carousel"
import { getYearFromDate } from "../../utils/dates"
import Image from "gatsby-image"

type ViewerProps = {
  image: any
  onClick: () => void
}

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.815);
  left: 0;
  top: 0;
`

const Img = styled(Image)`
  height: 100vh;
`

const Viewer = (props: ViewerProps) => {
  console.log(props)
  return (
    <Container onClick={props.onClick}>
      <Img
        fluid={props.image.childImageSharp.fluid}
        imgStyle={{ objectFit: "contain" }}
      />
    </Container>
  )
}

export default Viewer
