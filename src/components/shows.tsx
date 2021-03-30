import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import { getYearFromDate } from "../utils/dates"
import { getThingsByDate } from "../utils/organize"
import ThingYear from "./common/thingYear"
import Show from "./show"
import Layout from "./layout"

const Container = styled.div``

const Shows = () => {
  const dataShows = useStaticQuery(graphql`
    query showQuery {
      shows: allMarkdownRemark(
        filter: { fields: { collection: { eq: "shows" } } }
      ) {
        edges {
          node {
            fields {
              slug
              collection
            }
            frontmatter {
              title
              start_date
              end_date
              description
              location
            }
          }
        }
      }
    }
  `)

  const allShows = dataShows.shows.edges
  console.log(allShows)
  const showsByDate = getThingsByDate(allShows)
  const years = Object.keys(showsByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )
  return (
    <Container>
      {years.map((y: any) => (
        <ThingYear year={y} things={showsByDate[y]} isWorks={false} />
      ))}
    </Container>
  )
}

export default Shows
