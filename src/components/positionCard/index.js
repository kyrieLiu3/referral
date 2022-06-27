import React, { useEffect, useRef, useState } from 'react'
import { Tag } from 'antd'
import Styles from './positionCard.module.less'

const PositionCard = ({ onCardClick, position = {} }) => {
  const descriptionRef = useRef()
  const [isShowEllipsis, setIsShowEllipsis] = useState(false)
  useEffect(() => {
    const showEllipsis =
      descriptionRef.current.scrollHeight > descriptionRef.current.offsetHeight
    setIsShowEllipsis(showEllipsis)
  }, [descriptionRef])
  return (
    <div className={Styles.card} onClick={() => onCardClick(position.positionId)}>
      <div className={Styles.cardTitle}>{position.positionName}</div>
      <div className={Styles.tagWrapper}>
        <Tag color="volcano">{position.city}</Tag>
        <Tag color="geekblue">{position.positionType}</Tag>
      </div>
      <div
        className={`${Styles.cardDescription} ${
          isShowEllipsis ? Styles.ellipsis : ''
        }`}
        ref={descriptionRef}
      >
        {position.positionDescription}
      </div>
    </div>
  )
}

export default PositionCard
