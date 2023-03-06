import type { NextRouter } from 'next/router'

export const routerValue: NextRouter = {
  route: '',
  pathname: '',
  query: {},
  asPath: '',
  basePath: '',
  isLocaleDomain: false,
  async push() {
    return false
  },
  async replace() {
    return false
  },
  async reload() {
    return false
  },
  async back() {
    return false
  },
  async forward() {
    return false
  },
  async prefetch() {
    return
  },
  async beforePopState() {
    return false
  },
  events: {
    on: () => null,
    off: () => null,
    emit: () => null,
  },
  isFallback: false,
  isReady: false,
  isPreview: false,
}
