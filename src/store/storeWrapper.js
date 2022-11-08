import { RecoilRoot } from 'recoil'
import RecoilUtils from './utils'

const StoreWrapper = ({ children }) => {
  return (
    <RecoilRoot>
      <RecoilUtils></RecoilUtils>
      {children}
    </RecoilRoot>
  )
}

export default StoreWrapper
