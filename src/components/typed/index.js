import React, { useEffect } from 'react'
import Typed from 'typed.js'

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
    <div id="typed" style={{ fontSize: 38, color: 'rgba(0, 0, 0, .85)', textAlign: 'center' }}></div>
  )
}

export default TypedComponent