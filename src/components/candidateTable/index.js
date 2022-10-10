import React, { useEffect, useState, useCallback } from 'react'
import { Button, Table, Space, message, Dropdown, Menu, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import {
  getCandidatesByUserId,
  downloadResume,
  getCandidatesByPositionId,
  getCandidatesByHrgUserId,
  updateCandidateStatus,
} from '../../api'
import { download } from '../../utils'
import { useIsHrg } from '../../hooks'
import { userState } from '../../store/user/user'
import { CANDIDATE_STATUS_MAPPING, CANDIDATE_STATUS_TAG } from '../../constant'

const CandidateTable = ({ tableHeight, positionId, isByUserId = false }) => {
  // This table component is for two places, one is for 'myReferral' page with employee, and the other is for 'myUpload' page with HRG.
  // The positionId is for getCandidatesByPositionId api param, and we integrated the downloading resume functionality in this component
  const navigate = useNavigate()
  const isHrg = useIsHrg()
  const { userId } = useRecoilValue(userState)
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTableData = useCallback(async () => {
    try {
      setIsLoading(true)
      const handler = isHrg
        ? isByUserId
          ? getCandidatesByHrgUserId
          : getCandidatesByPositionId
        : getCandidatesByUserId
      const { data } = await handler(
        isHrg ? (isByUserId ? { userId } : { positionId }) : undefined
      )
      setTableData(data)
    } catch (error) {
      console.log(error)
      message.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [isByUserId, isHrg, positionId, userId])

  // get positions
  useEffect(() => {
    fetchTableData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  const generateStatusMenuItem = ({ candidateId }) => {
    const items = Object.entries(CANDIDATE_STATUS_MAPPING).map(
      ([key, value]) => {
        return { label: value, key }
      }
    )

    return (
      <Menu
        onClick={({ key }) => handleChangeStatus(candidateId, key)}
        items={items}
      />
    )
  }

  const handleChangeStatus = async (candidateId, candidateStatus) => {
    try {
      const params = { candidateId, candidateStatus }
      await updateCandidateStatus(params)
      fetchTableData()
    } catch (error) {
      console.log(error)
    }
  }

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
      title: 'Hire Process',
      dataIndex: 'candidateStatusTitle',
      key: 'candidateStatusTitle',
      render: (_, record) => (
        <Tag color={CANDIDATE_STATUS_TAG[record.candidateStatus]}>
          {record.candidateStatusTitle}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 280,
      render: (_, record) => (
        <Space size="middle">
          {isHrg ? (
            <Dropdown
              overlay={generateStatusMenuItem(record)}
              placement="bottom"
              trigger="click"
              arrow
            >
              <Button type="link">Process</Button>
            </Dropdown>
          ) : (
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
      rowKey="candidateId"
      columns={columns}
      dataSource={tableData}
      loading={isLoading}
      scroll={tableHeight && { y: tableHeight }}
    ></Table>
  )
}

export default CandidateTable
