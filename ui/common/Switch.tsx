import React from 'react'
import { observer } from 'mobx-react'

export const Switch: React.FC<{ visibility: boolean }> = observer((props) => {
  return <>{props.visibility ? props.children : null}</>
})
