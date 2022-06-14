import React from 'react'
import SignInWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const SignIn = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <SignInWrapper></SignInWrapper>
      </Content>
    </React.Fragment>
  )
}

export default SignIn