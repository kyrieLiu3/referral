import React, { useState } from 'react'
import Styles from './wrapper.module.less'
import Filter from './components/filter'
import Jobs from './components/jobs'
import Paginator from './components/paginator'

const JOB_TYPE_OPS = [
  { title: 'All', value: 'all' },
  { title: 'Tech', value: 'tech' },
  { title: 'Non-Thch', value: 'non-tech' },
]

const CITY_OPS = [
  { title: 'All', value: 'all' },
  { title: 'Chengdu', value: 'chendu' },
  { title: 'Xian', value: 'xian' },
]

const JobListWrapper = () => {
  const [filterData, setFilterData] = useState({ jobType: 'all', city: 'all', job: '' })
  const handleFilterDataChange = data =>
    setFilterData({ ...filterData, ...data })
  // TODO: Finish search logic block
  const handleSearch = () => {}
  return (
    <div className={Styles.jobListWrapper}>
      <Filter
        jobTypeOps={JOB_TYPE_OPS}
        cityOps={CITY_OPS}
        filterData={filterData}
        onFilterDataChange={handleFilterDataChange}
        onSearch={handleSearch}
      ></Filter>
      <Jobs></Jobs>
      <Paginator></Paginator>
    </div>
  )
}

export default JobListWrapper
