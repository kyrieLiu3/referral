import React, { useEffect, useState, useRef } from 'react'
import { Button, Table, Space, message, Modal } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Styles from './wrapper.module.less'
import { getUploadedPositions } from '../../api'
import CandidateTable from '../../components/candidateTable'

const MyUploadWrapper = () => {
  const navigate = useNavigate()
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const wrapperRef = useRef(null)
  const [tableHeight, setTableHeight] = useState(0)
  const [visible, setVisible] = useState(false)
  const [selectedPositionId, setSelectedPositionId] = useState('')
  const [selectedPositionName, setSelectedPositionName] = useState('')

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

  const handleCheck = positionId => navigate(`/position/${positionId}`)
  const handleCheckCandidates = ({ positionId, positionName }) => {
    setVisible(true)
    setSelectedPositionId(positionId)
    setSelectedPositionName(positionName)
  }
  const handleEdit = positionId => 
    navigate(`/uploadPosition?isEdit=true&positionId=${positionId}`)

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
          <Button type="link" onClick={() => handleCheck(record.positionId)}>
            Detail
          </Button>
          <Button type="link" onClick={() => handleCheckCandidates(record)}>Candidates</Button>
          <Button type="link" onClick={() => handleEdit(record.positionId)}>
            Edit
          </Button>
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
      <Modal
        title={`Candidates for ${selectedPositionName}`}
        centered
        footer={null}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <CandidateTable tableHeight={800} positionId={selectedPositionId}></CandidateTable>
      </Modal>
    </div>
  )
}

export default MyUploadWrapper
