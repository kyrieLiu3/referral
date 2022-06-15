import React from 'react'
import JobLisyWrapper from './wrapper'
import Header from '../../components/header'
import Content from '../../components/content'

const JobList = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <JobLisyWrapper></JobLisyWrapper>
      </Content>
    </React.Fragment>
  )
}

export default JobList
