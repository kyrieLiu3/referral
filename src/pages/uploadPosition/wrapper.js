import React, { useState } from 'react'
import { Form, Input, Button, Radio, message } from 'antd'
import { useRecoilValue } from 'recoil'
import Styles from './wrapper.module.less'
import { POSITION_TYPE_OPS, CITY_OPS, ALL } from '../../config'
import { userState } from '../../store'
import { uploadPosition } from '../../api'
import { useNavigate } from 'react-router-dom'

const UploadPositionWrapper = () => {
  const navigate = useNavigate()
  const { userId } = useRecoilValue(userState)
  const [form] = Form.useForm()
  const [isLoading, setIsloading] = useState(false)
  
  const formInitialValue = { positionType: ALL, city: ALL }
  const positionNameRules = [
    {
      required: true,
      message: 'Please input position name',
    },
  ]
  const positionDescribtionRules = [
    {
      required: true,
      message: 'Please input position describtion',
    },
  ]
  const positionResposibilitiesRules = [
    {
      required: true,
      message: 'Please input position responsibilities',
    },
  ]

  const positionQualificationsRules = [
    {
      required: true,
      message: 'Please input position responsibilities',
    },
  ]

  const handleReset = () => {
    form.resetFields()
  }

  const handleUploadPosition = async () => {
    try {
      await form.validateFields()
      setIsloading(true)
      const {
        positionName,
        positionDescribtion,
        positionQualifications,
        positionResposibilities,
        positionType,
        city,
      } = form.getFieldsValue(true)
      const params = {
        positionName,
        positionDescribtion,
        positionQualifications,
        positionResposibilities,
        positionType,
        city,
        userId,
      }
      await uploadPosition(params)
      message.success('Position uploaded successfully')
      navigate('/myPost')
    } catch (error) {
    } finally {
      setIsloading(false)
    }
  }
  return (
    <div className={Styles.UploadPositionWrapper}>
      <div className={Styles.uploadPosition}>
        <Form
          form={form}
          name="position"
          layout="vertical"
          initialValues={formInitialValue}
        >
          <Form.Item
            name="positionName"
            label="Position Name"
            rules={positionNameRules}
            validateTrigger="onBlur"
          >
            <Input placeholder="Enter the position name" allowClear />
          </Form.Item>
          <Form.Item label="Position Type" name="positionType">
            <Radio.Group>
              {POSITION_TYPE_OPS.map(({ title, value }) => {
                return (
                  <Radio.Button value={value} key={value}>
                    {title}
                  </Radio.Button>
                )
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="City" name="city">
            <Radio.Group>
              {CITY_OPS.map(({ title, value }) => {
                return (
                  <Radio.Button value={value} key={value}>
                    {title}
                  </Radio.Button>
                )
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="positionDescribtion"
            label="Position Describtion"
            rules={positionDescribtionRules}
            validateTrigger="onBlur"
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter the position describtion"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="positionResposibilities"
            label="Position Resposibilities"
            rules={positionResposibilitiesRules}
            validateTrigger="onBlur"
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter the position resposibilities"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="positionQualifications"
            label="Position Qualifications"
            rules={positionQualificationsRules}
            validateTrigger="onBlur"
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter the position qualifications"
              allowClear
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
              onClick={handleUploadPosition}
              loading={isLoading}
            >
              Upload
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default UploadPositionWrapper
