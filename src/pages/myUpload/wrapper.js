import React from 'react'
import { Button, Table /* Space */ } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Styles from './wrapper.module.less'
import { useNavigate } from 'react-router-dom'

const MyUploadWrapper = () => {
  const navigate = useNavigate()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    /* {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
        </Space>
      ),
    }, */
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
      <div className={Styles.myUpload}>
        <Table columns={columns}></Table>
      </div>
    </div>
  )
}

export default MyUploadWrapper
