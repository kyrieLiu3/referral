import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Styles from './wrapper.module.less'
import CandidateTable from '../../components/candidateTable'

const MyCandidateWrapper = () => {
  const navigate = useNavigate()
  const wrapperRef = useRef(null)
  const [tableHeight, setTableHeight] = useState(0)

  useEffect(() => {
    // compute available height of the table
    const height = wrapperRef.current.offsetHeight - 32 - 55 - 64
    setTableHeight(height)
  }, [])

  return (
    <div className={Styles.myCandidateWrapper}>
      <div className={Styles.myCandidateAction}>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => navigate('/positions')}
        >
          Upload Position
        </Button>
      </div>
      <div className={Styles.myCandidate} ref={wrapperRef}>
        <CandidateTable tableHeight={tableHeight} isByUserId></CandidateTable>
      </div>
    </div>
  )
}

export default MyCandidateWrapper
