import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'antd'
import { RightSquareOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Styles from './wrapper.module.less'
import CandidateTable from '../../components/candidateTable'

const MyReferralWrapper = () => {
  const navigate = useNavigate()
  const wrapperRef = useRef(null)
  const [tableHeight, setTableHeight] = useState(0)

  useEffect(() => {
    // compute available height of the table
    const height = wrapperRef.current.offsetHeight - 32 - 55 - 64
    setTableHeight(height)
  }, [])

  return (
    <div className={Styles.myReferralWrapper}>
      <div className={Styles.myReferralAction}>
        <Button
          type="primary"
          icon={<RightSquareOutlined />}
          onClick={() => navigate('/positions')}
        >
          Go Referral
        </Button>
      </div>
      <div className={Styles.myReferral} ref={wrapperRef}>
        <CandidateTable tableHeight={tableHeight}></CandidateTable>
      </div>
    </div>
  )
}

export default MyReferralWrapper
