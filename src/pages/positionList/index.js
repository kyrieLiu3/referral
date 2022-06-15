import React from 'react'
import PositionListWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const PositionList = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <PositionListWrapper></PositionListWrapper>
      </Content>
    </React.Fragment>
  )
}

export default PositionList
