import React from "react"
import styled from "styled-components"
import Layout from "./layout"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Carousel from "./carousel"
import { getShowDates } from "../utils/dates"
import Markdown from "react-markdown"

const Container = styled.div``
const Info = styled.div`
  margin-top: 16px;
`
const Desc = styled.div`
  margin: 16px 0;
`

type ShowProps = {
  data: any
}

const Show = (props: ShowProps) => {
  console.log(props)
  const { show } = props.data
  const { works } = show.fields
  const getWorkImages = () => {
    const wi: any = []
    works.forEach((w: any) => {
      wi.push(...w.details.images)
    })
    return wi
  }
  const workImages = getWorkImages()
  const { title, start_date, end_date, description, location } = show.details
  const date = getShowDates(start_date, end_date)

  return (
    <Layout>
      <Carousel images={workImages} />
      <Info>
        <p>
          <em>{title}</em>
        </p>
        <p>{date}</p>
        <p>{location}</p>
      </Info>
      <Desc>
        <Markdown>{description}</Markdown>
      </Desc>
    </Layout>
  )
}

export default Show

export const query = graphql`
  query showQ($id: String!) {
    show: markdownRemark(id: { eq: $id }) {
      details: frontmatter {
        start_date
        end_date
        title
        location
        description
      }
      fields {
        works {
          fields {
            slug
          }
          details: frontmatter {
            title
            images {
              childImageSharp {
                fluid(sizes: "(max-width: 1200px) calc(100vw - 40px), 1200px") {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
