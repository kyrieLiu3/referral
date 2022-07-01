import React from 'react'
import Header from '../header'
import Content from '../content'
import Styles from './forbidden.module.less'

const Forbidden = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <div className={Styles.forbiddenContainer}>
          <p className={Styles.forbidden}>
            Opps, Forbidden! <span className={Styles.signin}>Sign In</span>
          </p>
        </div>
      </Content>
    </React.Fragment>
  )
}

export default Forbidden
