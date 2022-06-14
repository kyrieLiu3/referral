import React from 'react'
import SignUpWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const SignUp = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <SignUpWrapper></SignUpWrapper>
      </Content>
    </React.Fragment>
  )
}

export default SignUp
