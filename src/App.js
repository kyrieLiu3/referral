import React from 'react'
import StoreWrapper from './store/storeWrapper'
import RouterWrapper from './routes'

const App = () => {
  return (
    <StoreWrapper>
      <RouterWrapper></RouterWrapper>
    </StoreWrapper>
  )
}

export default App
