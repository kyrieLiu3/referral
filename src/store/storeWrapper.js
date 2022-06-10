import { RecoilRoot } from 'recoil'

const StoreWrapper = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default StoreWrapper
