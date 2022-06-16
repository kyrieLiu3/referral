import React from 'react'
import Styles from './content.module.less'

const Content = ({ children }) => {
  return <main className={Styles.container}>{children}</main>
}

export default Content
