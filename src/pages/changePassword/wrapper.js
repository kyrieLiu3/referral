import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import Styles from './wrapper.module.less'
import { changePassword as httpChangePsw } from '../../api'
import { passwordReg } from '../../utils/reg'
import { useLogOut } from '../../hooks'

const Wrapper = () => {
  const [form] = Form.useForm()
  const logOut = useLogOut()
  const oldPasswordRules = [
    {
      required: true,
      message: 'Please input your old password',
    },
  ]
  const newPasswordRules = [
    {
      required: true,
      message: 'Please input your new password',
    },
    {
      pattern: passwordReg,
      message:
        'Password must be a combination of letters and numbers, 8 at least and less than 16',
    },
  ]
  const newPasswordConfirmRules = [
    {
      required: true,
      message: 'Please confirm your new password',
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

  const [isLoading, setIsLoading] = useState(false)

  const handleReset = () => form.resetFields()
  const handleSignUp = async () => {
    try {
      await form.validateFields()

      setIsLoading(true)
      const { oldPassword, newPassword, newPasswordConfirm } = form.getFieldsValue(true)
      const params = {
        oldPassword,
        newPassword,
        newPasswordConfirm
      }
      await httpChangePsw(params)

      message.success('Change password successfully')
      logOut()
    } catch (error) {
      console.log(error)
      message.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={Styles.changePswWrapper}>
      <div className={Styles.changePswContent}>
        <Form form={form} name="account" layout="vertical">
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={oldPasswordRules}
            validateTrigger="onBlur"
          >
            <Input.Password placeholder="Input your old password" allowClear />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={newPasswordRules}
            validateTrigger="onBlur"
          >
            <Input.Password allowClear placeholder="Input your new password" />
          </Form.Item>
          <Form.Item
            name="newPasswordConfirm"
            label="Confirm New Password"
            rules={newPasswordConfirmRules}
            validateTrigger="onBlur"
          >
            <Input.Password
              allowClear
              placeholder="Input your new password again"
            />
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
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Wrapper
