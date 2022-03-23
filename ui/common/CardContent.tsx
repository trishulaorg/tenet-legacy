import React from 'react'

export const CardContent: React.FC<{ content: string; isPost?: boolean }> = ({
  content,
  isPost = true,
}) => {
  const style = isPost ? 'px-6 pb-8' : 'pl-4 pb-8'
  return (
    <div className={style}>
      <p>{content}</p>
    </div>
  )
}
