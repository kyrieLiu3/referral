import React from 'react'
import Styles from './styles/positions.module.less'
import PositionCard from '../../../components/positionCard'

const Positions = ({ onCardClick, positions }) => {
  return (
    <div className={Styles.positionsWrapper}>
      {
        positions.map(position => {
          return <PositionCard onCardClick={onCardClick} position={position} key={position.positionId}></PositionCard>
        })
      }
    </div>
  )
}

export default Positions
