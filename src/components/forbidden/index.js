import React from 'react'
import Header from '../header'
import Content from '../content'
import Styles from './forbidden.module.less'
import { useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'

const Forbidden = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <div className={Styles.forbiddenContainer}>
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button
                type="primary"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </Button>
            }
          />
        </div>
      </Content>
    </React.Fragment>
  )
}

export default Forbidden
