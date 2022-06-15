import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import Typed from '../../components/typed'
import Styles from './wrapper.module.css'
import { HRG, EMPLOYEE } from '../../constant'

const HomeWrapper = () => {
  const navigate = useNavigate()
  const size = 'large'
  const options = {
    strings: ['Employee Referral Program', 'Appreciate Your Recommendations!']
  }
  return (
    <div className={Styles.homeWrapper}>
      <div className={Styles.leftside}></div>
      <div className={Styles.rightside}></div>
      <div className={Styles.homeDetail}>
        <div className={Styles.welcomeTextWrapper}>
          <Typed options={options}></Typed>
        </div>
        <div className={Styles.detailWrapper}>
          <div className={`${Styles.detailButton} ${Styles.detailButtonLeft}`}>
            <Button
              type="primary"
              shape="round"
              size={size}
              onClick={() => navigate(`/signin?userType=${EMPLOYEE}`)}
            >
              Employee
            </Button>
          </div>
          <div className={Styles.detailButton}>
            <Button
              type="default"
              shape="round"
              size={size}
              onClick={() => navigate(`/signin?userType=${HRG}`)}
            >
              HRG
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeWrapper
