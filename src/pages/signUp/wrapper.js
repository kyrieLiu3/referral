import React, { useState } from 'react'
import { Tabs, Form, Input, Button } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Styles from './wrapper.module.less'
import { HRG, EMPLOYEE } from '../../constant'
import { httpSignup, validateEmail } from '../../api'
import { passwordReg, emailReg } from '../../utils/reg'

const Wrapper = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const mailRules = [
    {
      required: true,
      message: 'Please input your E-mail',
    },
    {
      validator: (_, value) => {
        if (!value) return Promise.resolve()
        if (!emailReg.test(value)) return Promise.reject(new Error('Please input valid email'))
        return validateEmail({ email: value }).then(
          ({ data }) => {
            return (
              data ||
              Promise.reject(new Error('The email has been registered'))
            )
          },
          error => {
            console.log(error)
            return new Error(
              'An error occurred when validating email, try again please'
            )
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
  const [userType, setUserType] = useState(
    routeQuery.get('userType') || EMPLOYEE
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = () => form.resetFields()
  const handleSignUp = async () => {
    try {
      setIsLoading(true)
      await form.validateFields()
      const { email, password, invitationCode } = form.getFieldsValue(true)
      const params = {
        username: email,
        password,
        role: userType,
      }
      userType === HRG && (params['invitationCode'] = invitationCode)
      await httpSignup(params)
      //TODO: REDIRCT to position list page
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = activeKey => {
    setUserType(activeKey)
  }

  return (
    <div className={Styles.signupWrapper}>
      <div className={Styles.signupContent}>
        <Tabs
          centered
          defaultActiveKey={userType}
          moreIcon={null}
          onChange={handleTabChange}
        >
          <TabPane tab="Employee" key={EMPLOYEE}></TabPane>
          <TabPane tab="HRG" key={HRG}></TabPane>
        </Tabs>
        <Form form={form} name="account" layout="vertical">
          <Form.Item
            name="email"
            label="email"
            rules={mailRules}
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
          <Form.Item
            name="passwordConfirm"
            label="Confirm Password"
            rules={passwordConfirmRules}
            validateTrigger="onBlur"
          >
            <Input.Password
              allowClear
              placeholder="Enter your password again"
            />
          </Form.Item>
          {userType === HRG && (
            <Form.Item
              name="invitationCode"
              label="Invitation Code"
              rules={invitationCodeRules}
              validateTrigger="onBlur"
            >
              <Input placeholder="Enter your invitation code" />
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
