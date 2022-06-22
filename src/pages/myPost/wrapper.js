import React from 'react'
import { Button, Table, /* Space */ } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import Styles from './wrapper.module.less'
import { useNavigate } from 'react-router-dom'

const MyPostWrapper = () => {
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
    <div className={Styles.myPostWrapper}>
      <div className={Styles.myPostAction}>
        <Button type="primary" icon={<UploadOutlined />} onClick={() => navigate('/uploadPosition')}>
          New Post
        </Button>
      </div>
      <div className={Styles.myPost}>
        <Table columns={columns}></Table>
      </div>
    </div>
  )
}

export default MyPostWrapper
