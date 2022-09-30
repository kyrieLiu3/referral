import React from 'react'
import MyCandidateWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const MyCandidate = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <MyCandidateWrapper></MyCandidateWrapper>
      </Content>
    </React.Fragment>
  )
}

export default MyCandidate
