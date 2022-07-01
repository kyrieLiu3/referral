import React from 'react'
import Styles from './header.module.less'
import { Button, Dropdown, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../../store'
import { useLogOut } from '../../hooks'
import { EMPLOYEE } from '../../constant'

const LOG_OUT = 'LOG_OUT'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const MY_REFERRAL = 'MY_REFERRAL'
const MY_UPLOAD = 'MY_UPLOAD'

const Header = () => {
  const { username, role } = useRecoilValue(userState)
  const logOut = useLogOut()
  const navigate = useNavigate()
  const handleNavigate = path => navigate(path)
  const menuHandler = {
    LOG_OUT: () => logOut(),
    CHANGE_PASSWORD: () => navigate('/changePassword'),
    MY_REFERRAL: () => navigate('/myReferral'),
    MY_UPLOAD: () => navigate('/myUpload'),
  }

  const handleMenuClick = ({ key }) => {
    menuHandler[key]()
  }
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: role === EMPLOYEE ? 'My Referral' : 'My Upload',
          key: role === EMPLOYEE ? MY_REFERRAL : MY_UPLOAD,
        },
        {
          label: 'Change Password',
          key: CHANGE_PASSWORD,
        },
        {
          label: 'Log Out',
          key: LOG_OUT,
        },
      ]}
    />
  )

  return (
    <header className={Styles.container}>
      <div className={Styles.title} onClick={() => handleNavigate('/')}>
        AN & GP Referral
      </div>
      <div className={Styles.accountContainer}>
        {username ? (
          <React.Fragment>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <div className={Styles.username}>{username}</div>
            </Dropdown>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button type="primary" onClick={() => handleNavigate('/signup')}>
              Sign Up
            </Button>
            <Button type="link" onClick={() => handleNavigate('/signin')}>
              Sign In
            </Button>
          </React.Fragment>
        )}
      </div>
    </header>
  )
}

export default Header
