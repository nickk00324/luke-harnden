import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Location } from "@reach/router"

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

  @media only screen and (max-width: 1200px) {
    margin-bottom: 20px;
  }
`

const WorkNav = styled.div`
  padding-left: 10px;
`

const Sidebar = () => {
  const [isWorksActive, setIsWorksActive] = React.useState(false)
  const handleClick = (l?: boolean) => {
    if (l) {
      setIsWorksActive(true)
    } else {
      setIsWorksActive(false)
    }
  }
  return (
    <Location>
      {({ location }) => (
        <Container>
          <div className="name">
            <Link to="/">Luke Harnden</Link>
          </div>
          <Link to="/works">works</Link>
          {(location.pathname === "/works" ||
            location.pathname === "/shows") && (
            <WorkNav>
              <Link to="/shows">by exhibition</Link>
            </WorkNav>
          )}
          <Link to="/about">about</Link>
        </Container>
      )}
    </Location>
  )
}

export default Sidebar
