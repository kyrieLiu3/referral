import React from 'react'
import Header from '../header'
import Content from '../content'
import Styles from './forbidden.module.less'
import { useNavigate } from 'react-router-dom'

const Forbidden = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <div className={Styles.forbiddenContainer}>
          <p className={Styles.forbidden}>
            Opps, action is forbidden! <span className={Styles.signin} onClick={() => navigate('/signin')}>Sign In</span>
          </p>
        </div>
      </Content>
    </React.Fragment>
  )
}

export default Forbidden
