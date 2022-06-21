import React from 'react'
import ChangePswWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const ChangePsw = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <ChangePswWrapper></ChangePswWrapper>
      </Content>
    </React.Fragment>
  )
}

export default ChangePsw