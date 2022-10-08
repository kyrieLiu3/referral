import React from 'react'
import Styles from './styles/paginator.module.less'
import { Pagination } from 'antd'

const Paginator = (props) => {
  return (
    <div className={Styles.paginator}>
      <Pagination
        {...props}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
      />
    </div>
  )
}

export default Paginator
