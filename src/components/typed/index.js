import React, { useEffect } from 'react'
import Typed from 'typed.js'
import Styles from './typed.module.less'

const TypedComponent = ({ options }) => {
  useEffect(() => {
    const opts = {
      ...options,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: false
    }
    const typed = new Typed('#typed', opts)
    return () => typed.destroy()
  }, [options])
  return (
    <div id="typed" className={Styles.typedWrapper}></div>
  )
}

export default TypedComponent