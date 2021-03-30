import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "./layout"
import Carousel from "./carousel"
import { getYearFromDate } from "../utils/dates"
import { ShowCard } from "./common/thingYear"
import Markdown from "react-markdown"

const Info = styled.div`
  margin-top: 16px;
`
const Desc = styled.div`
  margin: 16px 0;
`

const Work = (props: any) => {
  const { work } = props.data
  const { title, description, medium, date } = work.details
  const { shows } = work.fields
  console.log(work)
  return (
    <Layout>
      <Carousel images={work.details.images} />
      <Info>
        <p>
          <em>{title}</em>
        </p>
        <p>{getYearFromDate(date)}</p>
        <p>{medium}</p>
      </Info>
      <Desc>
        <Markdown>{description}</Markdown>
        <ShowHolder shows={shows} />
      </Desc>
    </Layout>
  )
}

export default Work

const ShowContainer = styled.div``

const ShowHolder = (props: any) => {
  const { shows } = props
  return (
    <ShowContainer>
      {shows && (
        <>
          <p>appeared in: </p>
          {shows.map(s => (
            <ShowCard
              year={getYearFromDate(s.frontmatter.start_date)}
              title={s.frontmatter.title}
              location={s.frontmatter.location}
              slug={s.fields.slug}
              includeDate
            />
          ))}
        </>
      )}
    </ShowContainer>
  )
}

export const query = graphql`
  query workQ($id: String!) {
    work: markdownRemark(id: { eq: $id }) {
      details: frontmatter {
        title
        description
        medium
        date
        images {
          childImageSharp {
            fluid(sizes: "(max-width: 1200px) calc(100vw - 40px), 1200px") {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        shows {
          fields {
            slug
          }
          frontmatter {
            title
            start_date
            location
          }
        }
      }
    }
  }
`
