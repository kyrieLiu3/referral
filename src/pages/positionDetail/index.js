import React from 'react'
import PositionDetailWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const PositionDetail = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <PositionDetailWrapper></PositionDetailWrapper>
      </Content>
    </React.Fragment>
  )
}

export default PositionDetail
