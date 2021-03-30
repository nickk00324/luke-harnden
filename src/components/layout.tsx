import React from "react"
import styled from "styled-components"

import Sidebar from "./sidebar"

const Container = styled.div`
  max-width: 824px;
  margin: 50px auto 0;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0 24px;

  p {
    margin: 0;
    line-height: 20px;
  }

  @media only screen and (max-width: 1200px) {
    display: block;
  }
`

const Content = styled.div``

const Layout = (props: any) => {
  return (
    <Container>
      <Sidebar />
      {props.children}
    </Container>
  )
}

export default Layout
