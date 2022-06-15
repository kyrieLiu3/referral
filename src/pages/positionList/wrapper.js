import React, { useState } from 'react'
import Styles from './wrapper.module.less'
import Filter from './components/filter'
import Positions from './components/Positions'
import Paginator from './components/paginator'

const POSITION_TYPE_OPS = [
  { title: 'All', value: 'all' },
  { title: 'Tech', value: 'tech' },
  { title: 'Non-Tech', value: 'non-tech' },
]

const CITY_OPS = [
  { title: 'All', value: 'all' },
  { title: 'Chengdu', value: 'chendu' },
  { title: 'Xian', value: 'xian' },
]

const PositionLisyWrapper = () => {
  const [filterData, setFilterData] = useState({
    positionType: 'all',
    city: 'all',
    position: '',
  })
  const handleFilterDataChange = data =>
    setFilterData({ ...filterData, ...data })
  // TODO: Finish search logic block
  const handleSearch = () => {}
  return (
    <div className={Styles.positionsListWrapper}>
      <Filter
        positionOps={POSITION_TYPE_OPS}
        cityOps={CITY_OPS}
        filterData={filterData}
        onFilterDataChange={handleFilterDataChange}
        onSearch={handleSearch}
      ></Filter>
      <Positions></Positions>
      <Paginator></Paginator>
    </div>
  )
}

export default PositionLisyWrapper
