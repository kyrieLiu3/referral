import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './wrapper.module.less'
import Filter from './components/filter'
import Positions from './components/positions'
import Paginator from './components/paginator'
import { POSITION_TYPE_OPS, CITY_OPS } from '../../config'
import { ALL } from '../../constant'
import { getPositionsByConditions } from '../../api'

const PositionLisyWrapper = () => {
  const navigate = useNavigate()

  const [positions, setPositions] = useState([])
  const [filterData, setFilterData] = useState({
    positionType: ALL,
    city: ALL,
    positionName: '',
  })
  const [total, setTotal] = useState(0) 
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 10,
  })
  const [conditions, setConditions] = useState({ ...filterData, ...paginationData })

  const onPaginationChange = (pageNumber, pageSize) => {
    console.log(pageNumber, pageSize, 'pageNumber pageSize')
    setPaginationData({ ...paginationData, pageNumber, pageSize })
    setConditions({ ...conditions, pageNumber, pageSize })
  }

  const handleFilterDataChange = data => {
    setFilterData({ ...filterData, ...data })
  }

  useEffect(() => {
    const fetchPositions = async params => {
      const { data: { positions, total } } = await getPositionsByConditions(params)
      setPositions(positions)
      setTotal(total)
    }
    fetchPositions(conditions)
  }, [conditions])

  const handleSearch = () => {
    setConditions({...filterData, ...paginationData})
  }
  const handleCardClick = positionId => navigate(`/position/${positionId}`)

  return (
    <div className={Styles.positionsListWrapper}>
      <Filter
        positionOps={POSITION_TYPE_OPS}
        cityOps={CITY_OPS}
        filterData={filterData}
        onFilterDataChange={handleFilterDataChange}
        onSearch={handleSearch}
      ></Filter>
      <Positions onCardClick={handleCardClick} positions={positions}></Positions>
      <Paginator
        onChange={onPaginationChange}
        total={total}
      ></Paginator>
    </div>
  )
}

export default PositionLisyWrapper
