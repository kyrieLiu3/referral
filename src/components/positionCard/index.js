import React, { useEffect, useRef, useState } from 'react'
import { Tag } from 'antd'
import Styles from './positionCard.module.less'

const PositionCard = ({ onCardClick }) => {
  const descriptionRef = useRef()
  const [isShowEllipsis, setIsShowEllipsis] = useState(false)
  useEffect(() => {
    const showEllipsis =
      descriptionRef.current.scrollHeight > descriptionRef.current.offsetHeight
    setIsShowEllipsis(showEllipsis)
  }, [descriptionRef])
  return (
    <div className={Styles.card} onClick={() => onCardClick('123')}>
      <div className={Styles.cardTitle}>This is Card Title</div>
      <div className={Styles.tagWrapper}>
        <Tag color="volcano">Xian</Tag>
        <Tag color="geekblue">Tech</Tag>
      </div>
      <div
        className={`${Styles.cardDescription} ${
          isShowEllipsis ? Styles.ellipsis : ''
        }`}
        ref={descriptionRef}
      >
        This is job description and it will reapeat many times. This is job
        description and it will reapeat many times. This is job description and
        it will reapeat many times. This is job description and it will reapeat
        many times. This is job description and it will reapeat many times. This
        is job description and it will reapeat many times. This is job
        description and it will reapeat many times. This is job description and
        it will reapeat many times. This is job description and it will reapeat
        many times. This is job description and it will reapeat many times.
      </div>
    </div>
  )
}

export default PositionCard