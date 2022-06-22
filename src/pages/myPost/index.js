import React from 'react'
import MyPostWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const MyPost = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <MyPostWrapper></MyPostWrapper>
      </Content>
    </React.Fragment>
  )
}

export default MyPost
