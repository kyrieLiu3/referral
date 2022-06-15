import React from 'react'
import { Form, Radio, Button, Input } from 'antd'
import Styles from './styles/filter.module.less'

const Filter = ({
  filterData,
  onFilterDataChange,
  jobTypeOps,
  cityOps,
  onSearch,
}) => {
  const [form] = Form.useForm()
  return (
    <div className={Styles.filterWrapper}>
      <Form
        layout="inline"
        form={form}
        onValuesChange={onFilterDataChange}
        initialValues={filterData}
      >
        <Form.Item label="Job Type" name="jobType">
          <Radio.Group>
            {jobTypeOps.map(({ title, value }) => {
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
            {cityOps.map(({ title, value }) => {
              return (
                <Radio.Button value={value} key={value}>
                  {title}
                </Radio.Button>
              )
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Job Name" name="job">
          <Input allowClear placeholder="Search jobs"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSearch}>
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Filter
