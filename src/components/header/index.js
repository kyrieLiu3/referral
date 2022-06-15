import React from 'react'
import Styles from './header.module.less'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const handleNavigate = (path) => navigate(path)
  return (
    <header className={Styles.container}>
      <div className={Styles.title} onClick={() => handleNavigate('/')}>AN & GP Referral</div>
      <div className={Styles.accountContainer}>
        <Button type="primary" onClick={() => handleNavigate('/signup')}>Sign In</Button>
        <Button type="link" onClick={() => handleNavigate('/signin')}>Sign Up</Button>
        <Button type='link' onClick={() => handleNavigate('/positions')}>Position List</Button>
      </div>
    </header>
  )
}

export default Header
