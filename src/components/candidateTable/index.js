import React, { useEffect, useState } from 'react'
import { Button, Table, Space, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getCandidatesByUserId, downloadResume, getCandidatesByPositionId } from '../../api'
import { download } from '../../utils'
import { useIsHrg } from '../../hooks'

const CandidateTable = ({ tableHeight, positionId }) => {
  // This table component is for two places, one is for 'myReferral' page with employee, and the other is for 'myUpload' page with HRG.
  // The positionId is for getCandidatesByPositionId api param, and we integrated the downloading resume functionality in this component
  const navigate = useNavigate()
  const isHrg = useIsHrg()
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // get positions
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setIsLoading(true)
        const handler = isHrg ? getCandidatesByPositionId : getCandidatesByUserId
        const { data } = await handler(isHrg ? { positionId } : undefined)
        setTableData(data)
      } catch (error) {
        console.log(error)
        message.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTableData()
  }, [positionId, isHrg])

  const handleDownResume = async candidateId => {
    try {
      const { data, filename } = await downloadResume({ candidateId })
      download(data, filename)
    } catch (error) {
      console.log(error)
    }
  }
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
          {!isHrg && (
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
          )}
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
    <Table
      sticky
      rowKey="positionId"
      columns={columns}
      dataSource={tableData}
      loading={isLoading}
      scroll={tableHeight && { y: tableHeight }}
    ></Table>
  )
}

export default CandidateTable
