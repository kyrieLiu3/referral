import React from 'react'
import Header from '../header'
import Content from '../content'
import Styles from './notFound.module.less'

const NotFound = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <div className={Styles.notFoundContainer}>
          <p className={Styles.notFound}>Opps, Page Not Found!</p>
        </div>
      </Content>
    </React.Fragment>
  )
}

export default NotFound
