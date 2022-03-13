import React from 'react'
import { observer } from 'mobx-react'

export const HomeTabList: React.FC = observer((props) => {
  return <div className="flex mb-5">{props.children}</div>
})
