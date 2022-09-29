import React, { useState } from 'react'
import { Tabs, Form, Input, Button, message } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import Styles from './wrapper.module.less'
import { HRG, EMPLOYEE } from '../../constant'
import { passwordReg, emailReg } from '../../utils/reg'
import { httpSignin } from '../../api'
import { userState } from '../../store'

const Wrapper = () => {
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const [routeQuery] = useSearchParams()
  const { TabPane } = Tabs
  const [role, setRole] = useState(routeQuery.get('role') || EMPLOYEE)

  const emailRules = [
    {
      required: true,
      message: 'Please input your E-mail',
    },
    {
      pattern: emailReg,
      message: 'Please input valid E-mail',
    },
  ]

  const passwordRules = [
    {
      required: true,
      message: 'Please input your password',
    },
    {
      pattern: passwordReg,
      message:
        'Password must be a combination of letters and numbers, 8 at least and less than 16',
    },
  ]

  const handleToken = ({ token, ...userData }) => {
    localStorage.setItem('token', token)
    setUser(user => ({ ...user, ...userData, token }))
  }

  const handleReset = () => form.resetFields()
  const handleSignUp = async () => {
    try {
      await form.validateFields()
      setIsLoading(true)
      const { username, password } = form.getFieldsValue(true)
      const params = {
        username,
        password,
        role,
      }
      const { data } = await httpSignin(params)
      message.success('Log in successfully')
      handleToken(data)
      navigate('/positions')
    } catch (error) {
      message.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={Styles.signinWrapper}>
      <div className={Styles.signinContent}>
        <h2 className={Styles.signinTitle}>Sign In</h2>
        <Tabs
          centered
          defaultActiveKey={role}
          moreIcon={null}
          onChange={activeKey => setRole(activeKey)}
        >
          <TabPane tab="Employee" key={EMPLOYEE}></TabPane>
          <TabPane tab="HRG" key={HRG}></TabPane>
        </Tabs>
        <Form form={form} name="account" layout="vertical">
          <Form.Item
            name="username"
            label="Email"
            rules={emailRules}
            validateTrigger="onBlur"
          >
            <Input placeholder="Enter your email" allowClear />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={passwordRules}
            validateTrigger="onBlur"
          >
            <Input.Password allowClear placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={handleReset}
              style={{ width: '100%', marginBottom: '8px' }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              style={{ width: '100%', marginBottom: '8px' }}
              onClick={handleSignUp}
              loading={isLoading}
            >
              Sign In
            </Button>
            <p>
              Not hava a account yet?{' '}
              <Button
                type="link"
                style={{ padding: '4px' }}
                onClick={() => navigate(`/signup?role=${role}`)}
              >
                sign up
              </Button>
              now！
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Wrapper
