import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

const Home = () => {
  //i think i want to do a random work for the home page
  const allWorks = useStaticQuery(graphql`
    query homeWorksQuery {
      works: allMarkdownRemark(
        filter: { fields: { collection: { eq: "works" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              images {
                childImageSharp {
                  fluid(
                    sizes: "(max-width: 1200px) calc(100vw - 40px), 1200px"
                  ) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div>
      <div>home </div>
    </div>
  )
}

export default Home
