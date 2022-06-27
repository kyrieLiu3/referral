import React, { useEffect, useMemo, useState } from 'react'
import { Button, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../../store'
import Styles from './wrapper.module.less'
import { getPosition } from '../../api'
import { HRG } from '../../constant'

const PositionDetailWrapper = () => {
  const navigate = useNavigate()
  const { positionId } = useParams()
  const user = useRecoilValue(userState)

  const [position, setPosition] = useState({})
  const isHrg = useMemo(() => user.role === HRG, [user])
  const canEdit = useMemo(
    () => position.userId === user.userId,
    [position, user]
  )

  useEffect(() => {
    const fetchPositionDetail = async positionId => {
      try {
        const { data } = await getPosition({ positionId })
        setPosition(data)
      } catch (error) {
        console.log(error)
        message.error(error)
      }
    }
    fetchPositionDetail(positionId)
  }, [positionId])
  return (
    <div className={Styles.positionDetailWrapper}>
      <div className={Styles.detail}>
        <div className={Styles.title}>
          <div className={Styles.titleText}>{position.positionName}</div>
          <div>
            {isHrg ? (
              canEdit ? (
                <Button type="primary" onClick={() => navigate(`/uploadPosition?isEdit=true&positionId=${position.positionId}`)}>Edit</Button>
              ) : null
            ) : (
              <Button type="primary">Apply</Button>
            )}
          </div>
        </div>
        <div className={Styles.description}>
          <p className={Styles.descriptionTitle}>Description</p>
          <p>{position.positionDescription}</p>
        </div>
        <div className={Styles.responsibilities}>
          <p className={Styles.responsibilitiesTitle}>Responsibilities</p>
          <p>{position.positionResponsibilities}</p>
        </div>
        <div className={Styles.qualifications}>
          <p className={Styles.qualificationsTitle}>Qualifications</p>
          <p>{position.positionQualifications}</p>
        </div>
      </div>
    </div>
  )
}

export default PositionDetailWrapper
