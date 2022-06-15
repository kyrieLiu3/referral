import React from 'react'
import Styles from './styles/positions.module.less'
import PositionCard from '../../../components/positionCard'

const Jobs = () => {
  return (
    <div className={Styles.jobsWrapper}>
      <PositionCard></PositionCard>
      <PositionCard></PositionCard>
      <PositionCard></PositionCard>
      <PositionCard></PositionCard>
      <PositionCard></PositionCard>
      <PositionCard></PositionCard>
      <PositionCard></PositionCard>
    </div>
  )
}

export default Jobs