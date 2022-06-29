import React from 'react'
import RecommendPositionWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const RecommendPosition = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <RecommendPositionWrapper></RecommendPositionWrapper>
      </Content>
    </React.Fragment>
  )
}

export default RecommendPosition
