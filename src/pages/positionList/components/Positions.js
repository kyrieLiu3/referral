import React from 'react'
import Styles from './styles/positions.module.less'
import PositionCard from '../../../components/positionCard'

const Positions = ({ onCardClick }) => {
  return (
    <div className={Styles.jobsWrapper}>
      <PositionCard onCardClick={onCardClick}></PositionCard>
      <PositionCard onCardClick={onCardClick}></PositionCard>
      <PositionCard onCardClick={onCardClick}></PositionCard>
      <PositionCard onCardClick={onCardClick}></PositionCard>
      <PositionCard onCardClick={onCardClick}></PositionCard>
      <PositionCard onCardClick={onCardClick}></PositionCard>
      <PositionCard onCardClick={onCardClick}></PositionCard>
      <PositionCard onCardClick={onCardClick}></PositionCard>
    </div>
  )
}

export default Positions
