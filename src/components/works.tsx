import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"

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
  const data = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
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
    if (ot === OrgType.ByYear) setOrgType(OrgType.ByExhibition)
    else setOrgType(OrgType.ByYear)
  }

  const allWorks = data.allMarkdownRemark.edges
  const [orgType, setOrgType] = React.useState(OrgType.ByYear)
  return (
    <Container>
      <div className="nav">
        <div onClick={() => handleOrgTypeChange(OrgType.ByYear)}>by year</div>
        <div onClick={() => handleOrgTypeChange(OrgType.ByExhibition)}>
          by exhibition
        </div>
      </div>
      {orgType ? <ByYear works={allWorks} /> : <ByExhibition />}
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
  works: any
}

const ByYear = (props: ByYearProps) => {
  const { works } = props
  return (
    <div>
      {works.map((w: any) => {
        const { title, images } = w.node.frontmatter
        return <WorkCard img={images[0]} url={w.node.fields.slug} key={title} />
      })}
    </div>
  )
}

const ByExhibition = () => {
  return (
    <div>
      <div>this is by exhibition</div>
    </div>
  )
}

export default Works
