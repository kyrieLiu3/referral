import React from 'react'
import Styles from './styles/paginator.module.less'
import { Pagination } from 'antd'

const Paginator = () => {
  return (
    <div className={Styles.paginator}>
      <Pagination
        total={100}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
      />
    </div>
  )
}

export default Paginator
