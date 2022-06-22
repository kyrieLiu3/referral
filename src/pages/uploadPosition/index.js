import React from 'react'
import UploadPositionWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const UploadPosition = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <UploadPositionWrapper></UploadPositionWrapper>
      </Content>
    </React.Fragment>
  )
}

export default UploadPosition
