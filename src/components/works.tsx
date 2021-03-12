import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Shows from "./shows"

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
            }
            frontmatter {
              title
              date
              images {
                childImageSharp {
                  fluid {
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
  enum OrgType {
    ByYear,
    ByExhibition,
  }
  const handleOrgTypeChange = (ot: OrgType) => {
    if (ot === OrgType.ByYear) setOrgType(OrgType.ByYear)
    else setOrgType(OrgType.ByExhibition)
  }
  const allWorks = dataWorks.works.edges
  const [worksByYear, setWorksByYear] = React.useState<{ [year: string]: any }>(
    {}
  )
  const [exhibitions, setExhibitions] = React.useState()
  const getWorksByDate = () => {
    const wbd: { [year: string]: any } = {}
    allWorks.forEach((w: any) => {
      const year = new Date(w.node.frontmatter.date).getFullYear()
      if (wbd[year]) {
        wbd[year].push(w)
      } else {
        wbd[year] = [w]
      }
    })
    return wbd
  }
  React.useEffect(() => {
    if (!dataWorks) return
    setWorksByYear(getWorksByDate())
  }, [dataWorks])
  const [orgType, setOrgType] = React.useState(OrgType.ByYear)
  return (
    <Container>
      <div className="nav">
        <div onClick={() => handleOrgTypeChange(OrgType.ByYear)}>by year</div>
        <div onClick={() => handleOrgTypeChange(OrgType.ByExhibition)}>
          by exhibition
        </div>
      </div>
      {orgType === OrgType.ByYear ? (
        <ByYear works={worksByYear} />
      ) : (
        <ByExhibition />
      )}
    </Container>
  )
}

const CardContainer = styled.div``

type WorkCardProps = {
  img: any
  url: string
}

const WorkCard = (props: WorkCardProps) => {
  const { img, url } = props
  return (
    <CardContainer>
      <Link to={`/work${url}`}>
        <Image fluid={img.childImageSharp.fluid} />
      </Link>
    </CardContainer>
  )
}

type ByYearProps = {
  works: { [year: string]: any }
}

const ByYear = (props: ByYearProps) => {
  const { works } = props
  const years = Object.keys(works).sort()

  console.log(years)
  return (
    <div>
      {years.map(y => (
        <WorkYear year={y} works={works[y]} />
      ))}
    </div>
  )
}

type WorkYearProps = {
  year: string
  works: any
}
const WorkYear = (props: WorkYearProps) => {
  return (
    <div>
      <h2>{props.year}</h2>
      {props.works.map((w: any) => {
        const { title, images } = w.node.frontmatter
        return <WorkCard img={images[0]} url={w.node.fields.slug} key={title} />
      })}
    </div>
  )
}

const ByExhibition = () => {
  return <Shows />
}

export default Works
