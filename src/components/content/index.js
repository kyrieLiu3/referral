import React from "react";
import Styles from './content.module.css'

const Content = ({ children }) => {
  return (
    <main className={Styles.container}>{children}</main>
  )
}

export default Content