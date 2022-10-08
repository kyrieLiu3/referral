import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './wrapper.module.less'
import Filter from './components/filter'
import Positions from './components/positions'
import Paginator from './components/paginator'
import { POSITION_TYPE_OPS, CITY_OPS } from '../../config'
import { ALL } from '../../constant'
import { getPositionsByConditions } from '../../api'
import { useLoading } from '../../hooks'
import { message } from 'antd'

const PositionLisyWrapper = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [ref, Loading] = useLoading(isLoading)

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
      try {
        setIsLoading(true)
        const { data: { positions, total } } = await getPositionsByConditions(params)
        setPositions(positions)
        setTotal(total)
      } catch (error) {
        console.log(error)
        message.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPositions(conditions)
  }, [conditions])

  const handleSearch = () => {
    setConditions({...filterData, ...paginationData})
  }
  const handleCardClick = positionId => navigate(`/position/${positionId}`)

  return (
    <div className={Styles.positionsListWrapper} ref={ref}>
      <Loading isLoading={isLoading}></Loading>
      <Filter
        positionOps={POSITION_TYPE_OPS}
        cityOps={CITY_OPS}
        filterData={filterData}
        onFilterDataChange={handleFilterDataChange}
        onSearch={handleSearch}
      ></Filter>
      <Positions onCardClick={handleCardClick} positions={positions}></Positions>
      <Paginator
        current={paginationData.pageNumber}
        pageSize={paginationData.pageSize}
        onChange={onPaginationChange}
        total={total}
      ></Paginator>
    </div>
  )
}

export default PositionLisyWrapper
