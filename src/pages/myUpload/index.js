import React from 'react'
import MyUploadWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const MyUpload = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <MyUploadWrapper></MyUploadWrapper>
      </Content>
    </React.Fragment>
  )
}

export default MyUpload
