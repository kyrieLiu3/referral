import React from 'react'
import MyReferralWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const MyReferral = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <MyReferralWrapper></MyReferralWrapper>
      </Content>
    </React.Fragment>
  )
}

export default MyReferral
