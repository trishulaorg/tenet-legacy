import React from 'react'

export const CardMeta: React.FC<{ isPost?: boolean }> = (props) => {
  if (props.isPost) {
    return <div>{props.children}</div>
  }
  return <div className="pl-4">{props.children}</div>
}

CardMeta.defaultProps = {
  isPost: true,
}
