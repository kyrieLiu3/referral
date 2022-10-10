import React from 'react'
import Styles from './header.module.less'
import { Button, Dropdown, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../../store'
import { useLogOut, useIsHrg } from '../../hooks'

const LOG_OUT = 'LOG_OUT'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const MY_REFERRAL = 'MY_REFERRAL'
const MY_UPLOAD = 'MY_UPLOAD'
const MY_CANDIDATE = 'MY_CANDIDATE'
const POSITION_LIST = 'POSITION_LIST'

const Header = () => {
  const { username } = useRecoilValue(userState)
  const isHrg = useIsHrg()
  const logOut = useLogOut(isHrg)
  const navigate = useNavigate()
  const handleNavigate = path => navigate(path)
  const menuHandler = {
    LOG_OUT: () => logOut(),
    CHANGE_PASSWORD: () => navigate('/changePassword'),
    MY_REFERRAL: () => navigate('/myReferral'),
    MY_UPLOAD: () => navigate('/myUpload'),
    MY_CANDIDATE: () => navigate('/myCandidate'),
    POSITION_LIST: () => navigate('/positions'),
  }

  const handleMenuClick = ({ key }) => menuHandler[key]()
  const generateMenu = () => {
    const items = [
      {
        label: 'Position List',
        key: POSITION_LIST,
      },
      {
        label: !isHrg ? 'My Referral' : 'My Upload',
        key: !isHrg ? MY_REFERRAL : MY_UPLOAD,
      },
      {
        label: 'Change Password',
        key: CHANGE_PASSWORD,
      },
      {
        label: 'Log Out',
        key: LOG_OUT,
      },
    ]
    isHrg &&
      items.unshift({
        label: 'My Candidate',
        key: MY_CANDIDATE,
      })

    return <Menu onClick={handleMenuClick} items={items} />
  }

  return (
    <header className={Styles.container}>
      <div className={Styles.title} onClick={() => handleNavigate('/')}>
        AN & GP Referral
      </div>
      <div className={Styles.accountContainer}>
        {username ? (
          <React.Fragment>
            <Dropdown overlay={generateMenu()} placement="bottomRight" arrow>
              <div className={Styles.username}>{username}</div>
            </Dropdown>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button type="primary" shape="round" onClick={() => handleNavigate('/signup')}>
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
