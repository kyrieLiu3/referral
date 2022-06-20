import React, { useState } from 'react'
import { Tabs, Form, Input, Button, message } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Styles from './wrapper.module.less'
import { HRG, EMPLOYEE } from '../../constant'
import { httpSignup, validateEmail } from '../../api'
import { passwordReg, emailReg } from '../../utils/reg'

const Wrapper = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const emailRules = [
    {
      required: true,
      message: 'Please input your E-mail',
    },
    {
      validator: (_, value) => {
        if (!value) return Promise.resolve()
        if (!emailReg.test(value))
          return Promise.reject(new Error('Please input valid email'))
        return validateEmail({ email: value }).then(
          ({ data }) => {
            return (
              data ? Promise.resolve() : Promise.reject(new Error('The email has been registered'))
            )
          },
          error => {
            return Promise.reject(new Error(
              'An error occurred when validating email, try again please'
            ))
          }
        )
      },
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
  const passwordConfirmRules = [
    {
      required: true,
      message: 'Please confirm your password',
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve()
        }
        return Promise.reject(
          new Error('The two passwords that you inputed do not match')
        )
      },
    }),
  ]
  const invitationCodeRules = [
    {
      required: true,
      message: 'Please enter your invitation code',
    },
  ]

  const [routeQuery] = useSearchParams()
  const { TabPane } = Tabs
  const [role, setRole] = useState(routeQuery.get('role') || EMPLOYEE)
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = () => form.resetFields()
  const handleSignUp = async () => {
    try {
      await form.validateFields()

      setIsLoading(true)
      const { username, password, invitationCode } = form.getFieldsValue(true)
      const params = {
        username,
        password,
        role,
      }
      role === HRG && (params['invitationCode'] = invitationCode)
      await httpSignup(params)

      message.success('Register successfully')
      navigate('/signin')
    } catch (error) {
      console.log(error)
      message.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = activeKey => {
    setRole(activeKey)
  }

  return (
    <div className={Styles.signupWrapper}>
      <div className={Styles.signupContent}>
        <Tabs
          centered
          defaultActiveKey={role}
          moreIcon={null}
          onChange={handleTabChange}
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
            <Input placeholder="Input your email" allowClear />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={passwordRules}
            validateTrigger="onBlur"
          >
            <Input.Password allowClear placeholder="Input your password" />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            label="Confirm Password"
            rules={passwordConfirmRules}
            validateTrigger="onBlur"
          >
            <Input.Password
              allowClear
              placeholder="Input your password again"
            />
          </Form.Item>
          {role === HRG && (
            <Form.Item
              name="invitationCode"
              label="Invitation Code"
              rules={invitationCodeRules}
              validateTrigger="onBlur"
            >
              <Input placeholder="Input your invitation code" />
            </Form.Item>
          )}
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
              Sign Up
            </Button>
            <p>
              Or
              <Button
                type="link"
                style={{ padding: '4px' }}
                onClick={() => navigate('/signin')}
              >
                sign in
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
