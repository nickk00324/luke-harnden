import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

  .name {
    margin-bottom: 16px;
    a {
      text-decoration: none;
      color: black;
    }
  }
`

const Sidebar = () => {
  return (
    <Container>
      <div className="name">
        <Link to="/">Luke Harnden</Link>
      </div>
      <Link to="/works">works</Link>
      <Link to="/about">about</Link>
    </Container>
  )
}

export default Sidebar
