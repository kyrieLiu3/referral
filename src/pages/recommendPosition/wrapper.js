import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Input, Button, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import Styles from './wrapper.module.less'
import { addCandidate, getCandidatebyId, updateCandidateById } from '../../api'

const RecommendPositionWrapper = () => {
  const navigate = useNavigate()
  const { state: position } = useLocation()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [routeQuery] = useSearchParams()
  const [isEdit] = useState(routeQuery.get('isEdit') || false)
  const [candidateId] = useState(routeQuery.get('candidateId') || '')

  const actionUploadPrefix =
    process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''

  const uploadResumeHeaders = {
    Authorization: localStorage.getItem('token'),
  }

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
      pattern: /^1[3456789]\d{9}$/,
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
      message: 'Please Upload Candidate Resume',
    },
  ]

  // fetch form data if page is editing status
  useEffect(() => {
    if (isEdit) {
      const updateFormValue = async candidateId => {
        try {
          const params = { candidateId }
          const { data } = await getCandidatebyId(params)
          form.setFieldsValue(data)
        } catch (error) {
          console.log(error)
          message.error(error)
        }
      }
      updateFormValue(candidateId)
    }
  }, [isEdit, candidateId, form])

  const normFile = e => (Array.isArray(e) ? e : e?.fileList)
  const handleReset = () => form.resetFields()
  const handleSubmitOrUpdate = async () => {
    try {
      await form.validateFields()
      setIsLoading(true)
      const {
        candidateName,
        candidatePhoneNumber,
        candidateEmail,
        candidateResume: [{ name, status, response, uid }],
      } = form.getFieldsValue(true)
      const params = {
        positionId: position.positionId,
        positionName: position.positionName,
        candidateName,
        candidatePhoneNumber,
        candidateEmail,
        candidateResume: { name, status, response, uid },
        resumeId: response.data.resumeId,
      }
      isEdit && (params.candidateId = candidateId)
      const handler = isEdit ? updateCandidateById : addCandidate
      await handler(params)
      message.success('Submit Successfully')
      navigate('/myReferral')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={Styles.recommendPositionWrapper}>
      <div className={Styles.recommendPosition}>
        <div className={Styles.recommend}>
          <p className={Styles.selectedPosition}>
            Target Position:
            <span className={Styles.positionName}>{position.positionName}</span>
          </p>
          <Form form={form} name="recommend" layout="vertical">
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
                noStyle
                getValueFromEvent={normFile}
                rules={candidateResumeRules}
              >
                <Upload.Dragger
                  name="files"
                  accept=".doc, .docx, .pdf"
                  maxCount={1}
                  action={`${actionUploadPrefix}/api/resume/uploadResume`}
                  headers={uploadResumeHeaders}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single upload only.
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
                onClick={handleSubmitOrUpdate}
                loading={isLoading}
              >
                {isEdit ? 'Update' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default RecommendPositionWrapper
