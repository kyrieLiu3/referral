import React from 'react'
import Styles from './header.module.css'
import { Button } from 'antd'

const Header = () => {
  return (
    <header className={Styles.container}>
      <div className={Styles.title}>Referral</div>
      <div className={Styles.accountContainer}>
        <Button type="link">Sign In</Button>
        <Button type="link">Sign Up</Button>
      </div>
    </header>
  )
}

export default Header
