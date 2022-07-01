import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Space, message } from 'antd'
import { RightSquareOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Styles from './wrapper.module.less'
import { getCandidatesByUserId } from '../../api'

const MyReferralWrapper = () => {
  const navigate = useNavigate()
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const wrapperRef = useRef(null)
  const [tableHeight, setTableHeight] = useState(0)

  // get positions
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setIsLoading(true)
        const { data } = await getCandidatesByUserId()
        setTableData(data)
      } catch (error) {
        console.log(error)
        message.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTableData()
  }, [])

  useEffect(() => {
    // compute available height of the table
    const height = wrapperRef.current.offsetHeight - 32 - 55 - 64
    setTableHeight(height)
  }, [])

  // FIXME: Fix this logic block
  const handleDownResume = candidateId => {}
  const handleEdit = ({ candidateId, positionId, positionName }) =>
    navigate(`/recommend?isEdit=true&candidateId=${candidateId}`, {
      state: { positionId, positionName },
    })

  const columns = [
    {
      title: 'Candidate Name',
      dataIndex: 'candidateName',
      key: 'candidateName',
    },
    {
      title: 'Target Position',
      dataIndex: 'positionName',
      key: 'positionName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'candidatePhoneNumber',
      key: 'candidatePhoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'candidateEmail',
      key: 'candidateEmail',
    },
    {
      title: 'Action',
      key: 'action',
      width: 240,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            onClick={() => handleDownResume(record.candidateId)}
          >
            Download Resume
          </Button>
        </Space>
      ),
    },
  ]

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
        <Table
          sticky
          rowKey="positionId"
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          scroll={{ y: tableHeight }}
        ></Table>
      </div>
    </div>
  )
}

export default MyReferralWrapper
