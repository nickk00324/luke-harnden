import React from "react"
import styled from "styled-components"
import Layout from "./layout"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

const Container = styled.div``

const Images = styled.div`
  width: 800px;
  display: flex;
`
const Info = styled.div``

type ShowProps = {
  data: any
}

const Show = (props: ShowProps) => {
  console.log(props)
  const works = props.data.markdownRemark.fields.works

  return (
    <Layout>
      <Container>
        <Images>
          {works.map(w => (
            <WorkHolder images={w.frontmatter.images} slug={w.fields.slug} />
          ))}
        </Images>
      </Container>
    </Layout>
  )
}

export default Show

type ImageThumbProps = {
  image: any
  url: string
}

const ThumbContainer = styled.div``

const WorkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
`

const WorkHolder = (props: any) => {
  return (
    <WorkContainer>
      {props.images.map(i => (
        <ImageThumb image={i} url={props.slug} />
      ))}
    </WorkContainer>
  )
}

const Img = styled(Image)`
  width: 300px;
  height: 300px;
`
const ImageThumb = (props: ImageThumbProps) => {
  return (
    <ThumbContainer>
      <Link to={`/work${props.url}`}>
        <Img fluid={props.image.childImageSharp.fluid} />
      </Link>
    </ThumbContainer>
  )
}

export const query = graphql`
  query workQ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        date
      }
      fields {
        works {
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
`
