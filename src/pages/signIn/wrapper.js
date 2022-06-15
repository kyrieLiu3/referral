import React, { useState } from 'react'
import { Tabs, Form, Input, Button } from 'antd'
import { useSearchParams } from 'react-router-dom'
import Styles from './wrapper.module.less'
import { HRG, EMPLOYEE } from '../../constant'

const Wrapper = () => {
  const [form] = Form.useForm()

  const [routeQuery] = useSearchParams()
  const { TabPane } = Tabs
  const [userType, setUserType] = useState(routeQuery.get('userType') || EMPLOYEE)

  const handleReset = () => form.resetFields()
  const handleSignUp = async () => {
    try {
      // TODO: handle all customed validation rule detail
      await form.validateFields()
      const formData = form.getFieldsValue(true)
      console.log(formData, 'formData')
      // TODO: handle submit form data for signing up
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={Styles.signinWrapper}>
      <div className={Styles.signinContent}>
        <Tabs
          centered
          defaultActiveKey={userType}
          moreIcon={null}
          onChange={activeKey => setUserType(activeKey)}
        >
          <TabPane tab="Employee" key={EMPLOYEE}></TabPane>
          <TabPane tab="HRG" key={HRG}></TabPane>
        </Tabs>
        <Form form={form} name="account" layout="vertical">
          <Form.Item
            name="email"
            label="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email',
              },
            ]}
          >
            <Input placeholder="Enter your email" allowClear />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
          >
            <Input.Password allowClear placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleReset} style={{ width: '100%', marginBottom: '8px' }}>Reset</Button>
            <Button
              type="primary"
              style={{ width: '100%', marginBottom: '8px' }}
              onClick={handleSignUp}
            >
              Sign In
            </Button>
            <p>Not hava a account yet? <Button type='link' style={{ padding: '4px'}}>sign up</Button>now！</p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Wrapper
