import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Space, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Styles from './wrapper.module.less'
import { getUploadedPositions } from '../../api'

const MyUploadWrapper = () => {
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
        const params = {}
        const { data } = await getUploadedPositions(params)
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

  const handleCheck = (positionId) => navigate(`/position/${positionId}`)
  const handleEdit = (positionId) => navigate(`/uploadPosition?isEdit=true&positionId=${positionId}`)

  const columns = [
    {
      title: 'Position Name',
      dataIndex: 'positionName',
      key: 'positionName',
    },
    {
      title: 'Position Type',
      dataIndex: 'positionType',
      key: 'positionType',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Action',
      key: 'action',
      width: 300,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleCheck(record.positionId)}>detail</Button>
          <Button type="link">candidates</Button>
          <Button type="link" onClick={() => handleEdit(record.positionId)}>edit</Button>
        </Space>
      ),
    },
  ]

  return (
    <div className={Styles.myUploadWrapper}>
      <div className={Styles.myUploadAction}>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => navigate('/uploadPosition')}
        >
          Upload Position
        </Button>
      </div>
      <div className={Styles.myUpload} ref={wrapperRef}>
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

export default MyUploadWrapper
