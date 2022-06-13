import React from 'react'
import Styles from './wrapper.module.css'
import { Button } from 'antd'

const HomeWrapper = () => {
  const size = 'large'
  return (
    <div className={Styles.homeWrapper}>
      <div className={Styles.leftside}></div>
      <div className={Styles.rightside}></div>
      <div className={Styles.homeDetail}>
        <div className={Styles.detailWrapper}>
          <div className={`${Styles.detailButton} ${Styles.detailButtonLeft}`}><Button type="primary" shape="round" size={size}>Employee</Button></div>
          <div className={Styles.detailButton}><Button type="default" shape="round" size={size}>Human Resource Group</Button></div>
        </div>
      </div>
    </div>
  )
}

export default HomeWrapper