import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Shows from "./shows"
import { getThingsByDate } from "../utils/organize"
import ThingYear from "./common/thingYear"

const Container = styled.div`
  .nav {
    cursor: pointer;
    display: flex;
    div {
      margin-right: 20px;
    }
  }
`

const Works = () => {
  const dataWorks = useStaticQuery(graphql`
    query MyQuery {
      works: allMarkdownRemark(
        filter: { fields: { collection: { eq: "works" } } }
      ) {
        edges {
          node {
            fields {
              slug
              collection
            }
            frontmatter {
              title
              date
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

  const allWorks = dataWorks.works.edges
  const [worksByYear, setWorksByYear] = React.useState<{ [year: string]: any }>(
    {}
  )
  React.useEffect(() => {
    if (!dataWorks) return
    setWorksByYear(getThingsByDate(allWorks, true))
  }, [dataWorks])

  console.log(worksByYear)

  return (
    <Container>
      <ByYear works={worksByYear} />
    </Container>
  )
}

type ByYearProps = {
  works: { [year: string]: any }
}

const ByYear = (props: ByYearProps) => {
  const { works } = props
  const years = Object.keys(works).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )
  console.log(years)
  return (
    <div>
      {years.map(y => (
        <ThingYear year={y} things={works[y]} isWorks={true} />
      ))}
    </div>
  )
}

export default Works
