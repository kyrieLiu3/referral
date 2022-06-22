import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './wrapper.module.less'
import Filter from './components/filter'
import Positions from './components/Positions'
import Paginator from './components/paginator'
import { POSITION_TYPE_OPS, CITY_OPS, ALL } from '../../config'

const PositionLisyWrapper = () => {
  const navigate = useNavigate()
  const [filterData, setFilterData] = useState({
    positionType: ALL,
    city: ALL,
    position: '',
  })
  const handleFilterDataChange = data =>
    setFilterData({ ...filterData, ...data })
  // TODO: Finish search logic block
  const handleSearch = () => {}
  const handleCardClick = positionId => {
    navigate(`/position/${positionId}`)
  }
  return (
    <div className={Styles.positionsListWrapper}>
      <Filter
        positionOps={POSITION_TYPE_OPS}
        cityOps={CITY_OPS}
        filterData={filterData}
        onFilterDataChange={handleFilterDataChange}
        onSearch={handleSearch}
      ></Filter>
      <Positions onCardClick={handleCardClick}></Positions>
      <Paginator></Paginator>
    </div>
  )
}

export default PositionLisyWrapper
