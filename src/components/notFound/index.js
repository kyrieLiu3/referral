import React from 'react'
import { Result, Button } from 'antd'
import Header from '../header'
import Content from '../content'
import Styles from './notFound.module.less'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <div className={Styles.notFoundContainer}>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" onClick={() => navigate('/')}>
                Back Home
              </Button>
            }
          />
        </div>
      </Content>
    </React.Fragment>
  )
}

export default NotFound
