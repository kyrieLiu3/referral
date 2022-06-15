import React from 'react'
import Styles from './styles/jobs.module.less'
import JobCard from '../../../components/jobCard'

const Jobs = () => {
  return (
    <div className={Styles.jobsWrapper}>
      <JobCard></JobCard>
      <JobCard></JobCard>
      <JobCard></JobCard>
      <JobCard></JobCard>
      <JobCard></JobCard>
      <JobCard></JobCard>
      <JobCard></JobCard>
    </div>
  )
}

export default Jobs