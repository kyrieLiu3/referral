import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, Input, Button, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Styles from './wrapper.module.less'

const RecommendPositionWrapper = () => {
  const { state: position } = useLocation()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const candidateNameRules = [
    {
      required: true,
      message: 'Please Input Candidate Name',
    },
  ]
  const candidatePhoneNumberRules = [
    {
      required: true,
      message: 'Please Input Candidate Phone Number',
    },
    {
      pattern:
        /1^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
      message: 'Please Input Correct Phone Number',
    },
  ]
  const candidateEmailRules = [
    {
      required: true,
      message: 'Please Input Candidate Email',
    },
    {
      type: 'email',
      message: 'Please Input Correct Email',
    },
  ]
  const candidateResumeRules = [
    {
      required: true,
      message: 'Please Upload Candidate Resume'
    }
  ]

  const normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  const handleReset = () => form.resetFields()
  const handleSubmit = async () => {
    try {
      await form.validateFields()
    } catch (error) {
      console.log(error)
    }
  }
  const onValuesChange = (changedValue, allValue) => {
    console.log(changedValue, 'changedValue')
    console.log(allValue, 'allValue')
  }
  return (
    <div className={Styles.recommendPositionWrapper}>
      <div className={Styles.recommendPosition}>
        <div className={Styles.recommend}>
          <p className={Styles.selectedPosition}>
            Target Position:
            <span className={Styles.positionName}>{position.positionName}</span>
          </p>
          <Form
            form={form}
            name="recommend"
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              name="candidateName"
              label="Name"
              rules={candidateNameRules}
              validateTrigger="onBlur"
            >
              <Input placeholder="Enter Candidate Name" allowClear />
            </Form.Item>
            <Form.Item
              name="candidatePhoneNumber"
              label="Phone Number"
              rules={candidatePhoneNumberRules}
              validateTrigger="onBlur"
            >
              <Input allowClear placeholder="Enter Candidate Phone Number" />
            </Form.Item>
            <Form.Item
              name="candidateEmail"
              label="Email"
              rules={candidateEmailRules}
              validateTrigger="onBlur"
            >
              <Input allowClear placeholder="Enter Candidate Phone Number" />
            </Form.Item>
            <Form.Item label="Resume" required>
              <Form.Item
                name="candidateResume"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                rules={candidateResumeRules}
              >
                <Upload.Dragger
                  name="files"
                  action="http://localhost:8080/api/resume/uploadResume"
                  accept=".doc, .docx, .pdf"
                  maxCount={1}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
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
                onClick={handleSubmit}
                loading={isLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default RecommendPositionWrapper
