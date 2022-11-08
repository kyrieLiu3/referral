import { useRecoilCallback } from 'recoil'

const Utils = {}

const RecoilUtils = () => {
  Utils.get = useRecoilCallback(
    ({ snapshot }) =>
      atom =>
        snapshot.getLoadable(atom).contents,
    []
  )

  Utils.set = useRecoilCallback(
    ({ set }) =>
      (atom, valueOrUpdater) =>
        set(atom, valueOrUpdater),
    []
  )

  Utils.reset = useRecoilCallback(({ reset }) => reset, [])

  return null
}

export default RecoilUtils

export const getRecoil = atom => Utils.get(atom)

export const setRecoil = (atom, valueOrUpdater) =>
  Utils.set(atom, valueOrUpdater)

export const resetRecoil = atom => Utils.reset(atom)
