import React from 'react'
import HomeWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const Home = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <HomeWrapper></HomeWrapper>
      </Content>
    </React.Fragment>
  )
}

export default Home
