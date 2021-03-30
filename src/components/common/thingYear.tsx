import React from "react"
import styled from "styled-components"
import { getYearFromDate } from "../../utils/dates"
import Image from "gatsby-image"
import { Link } from "gatsby"

const Container = styled.div`
  h2 {
    margin-top: 0;
  }
`

const ThingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

type ThingYearProps = {
  year: string
  things: any
  isWorks: boolean
}
const ThingYear = (props: ThingYearProps) => {
  console.log(props.things)
  const sortedThings =
    props.things[0].node.fields.collection === "shows"
      ? props.things.sort((a: any, b: any) => {
          return (
            new Date(b.node.frontmatter.start_date).getTime() -
            new Date(a.node.frontmatter.start_date).getTime()
          )
        })
      : props.things.sort((a: any, b: any) => {
          return (
            new Date(b.node.frontmatter.date).getTime() -
            new Date(a.node.frontmatter.date).getTime()
          )
        })
  return (
    <Container>
      <h2>{props.year}</h2>
      <ThingsContainer>
        {sortedThings.map((w: any) => {
          if (props.isWorks) {
            const { title, images } = w.node.frontmatter
            return (
              <WorkCard img={images[0]} url={w.node.fields.slug} key={title} />
            )
          } else {
            const { title, location, date } = w.node.frontmatter
            return (
              <ShowCard
                title={title}
                year={getYearFromDate(date)}
                slug={w.node.fields.slug}
                location={location}
              />
            )
          }
        })}
      </ThingsContainer>
    </Container>
  )
}

const WorkCardContainer = styled.div`
  width: 250px;
  padding: 0 10px 10px 0;
  margin-bottom: 24px;
`

type WorkCardProps = {
  img: any
  url: string
}

const WorkCard = (props: WorkCardProps) => {
  const { img, url } = props
  return (
    <WorkCardContainer>
      <Link to={`/work${url}`}>
        <Image
          fluid={img.childImageSharp.fluid}
          imgStyle={{ objectFit: "contain" }}
        />
      </Link>
    </WorkCardContainer>
  )
}

type ShowCardProps = {
  year: number
  slug: string
  title: string
  location: string
  includeDate?: boolean
}

const ShowCardContainer = styled.div`
  margin-bottom: 24px;
`

export const ShowCard = (props: ShowCardProps) => {
  return (
    <ShowCardContainer>
      <Link to={`/show${props.slug}`}>
        {props.includeDate && <div>{props.year}</div>}

        <div>
          <em>{props.title}</em>
        </div>
        <div>{props.location}</div>
      </Link>
    </ShowCardContainer>
  )
}

export default ThingYear
