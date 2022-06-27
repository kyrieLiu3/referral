import React from 'react'
import Styles from './styles/paginator.module.less'
import { Pagination } from 'antd'

const Paginator = ({ total = 0, onChange = () => {} }) => {
  return (
    <div className={Styles.paginator}>
      <Pagination
        total={total}
        onChange={onChange}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
      />
    </div>
  )
}

export default Paginator
