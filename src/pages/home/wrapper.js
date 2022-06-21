import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import Typed from '../../components/typed'
import Styles from './wrapper.module.less'
import { HRG, EMPLOYEE } from '../../constant'
import { userSelector } from '../../store'

const HomeWrapper = () => {
  const username = useRecoilValue(userSelector)
  const navigate = useNavigate()
  const size = 'large'
  const options = {
    strings: ['Employee Referral Program', 'Appreciate Your Recommendations!'],
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
          {username ? (
            <Button
              className={Styles.findout}
              type="default"
              size="large"
              shape="round"
              onClick={() => navigate('/positions')}
              icon={<SearchOutlined />}
            >
              Find Out Referral Positions
            </Button>
          ) : (
            <React.Fragment>
              <div
                className={`${Styles.detailButton} ${Styles.detailButtonLeft}`}
              >
                <Button
                  type="primary"
                  shape="round"
                  size={size}
                  onClick={() => navigate(`/signin?role=${EMPLOYEE}`)}
                >
                  Employee
                </Button>
              </div>
              <div className={Styles.detailButton}>
                <Button
                  type="default"
                  shape="round"
                  size={size}
                  onClick={() => navigate(`/signin?role=${HRG}`)}
                >
                  HRG
                </Button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeWrapper
