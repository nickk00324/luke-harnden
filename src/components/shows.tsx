import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"

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
            }
            frontmatter {
              title
              date
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
  return (
    <Container>
      {allShows.map((s: any) => (
        <ShowCard
          title={s.node.frontmatter.title}
          year={s.node.frontmatter.date}
          slug={s.node.fields.slug}
          location={s.node.frontmatter.location}
        />
      ))}
    </Container>
  )
}

type ShowCardProps = {
  year: string
  slug: string
  title: string
  location: string
}

const ShowCard = (props: ShowCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).getFullYear()
  }
  return (
    <div>
      <Link to={`/show${props.slug}`}>
        <div>{formatDate(props.year)}</div>
        <div>
          <em>{props.title}</em>
        </div>
        <div>{props.location}</div>
      </Link>
    </div>
  )
}

export default Shows
