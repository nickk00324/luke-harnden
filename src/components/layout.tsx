import React from "react"
import styled from "styled-components"

import Sidebar from "./sidebar"

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto 0;
  display: grid;
  grid-template-columns: 200px 1fr;
`

const Layout = (props: any) => {
  return (
    <Container>
      <Sidebar />
      {props.children}
    </Container>
  )
}

export default Layout
