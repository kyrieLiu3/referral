import React from 'react'
import Styles from './header.module.less'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const handleSignUp = () => navigate('/signup')
  const handleSignIn = () => navigate('/signin')
  const handleGoHome = () => navigate('/home')
  return (
    <header className={Styles.container}>
      <div className={Styles.title} onClick={handleGoHome}>AN & GP Referral</div>
      <div className={Styles.accountContainer}>
        <Button type="link" onClick={handleSignIn}>Sign In</Button>
        <Button type="link" onClick={handleSignUp}>Sign Up</Button>
      </div>
    </header>
  )
}

export default Header
