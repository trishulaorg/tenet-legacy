import React from 'react'

export const CardMeta: React.FC<{ isPost?: boolean }> = (props) => {
  const style = props.isPost ? undefined : 'pl-4'
  return <div className={style}>{props.children}</div>
}

CardMeta.defaultProps = {
  isPost: true,
}
